import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { analyze, names } from '../analyzer.js';

const output = fileURLToPath(new URL('../../samples/', import.meta.url));
await mkdir(output, { recursive: true });

// Fictional palette: intentionally no manufacturer calibration or clinical values.
const palettes = [
  [
    [230, 211, 123],
    [146, 183, 113],
    [92, 135, 142],
  ],
  [
    [241, 220, 169],
    [215, 161, 112],
    [174, 115, 100],
  ],
  [
    [240, 213, 185],
    [201, 146, 172],
    [146, 91, 146],
  ],
  [
    [95, 153, 144],
    [163, 174, 102],
    [215, 192, 96],
  ],
  [
    [229, 209, 112],
    [148, 174, 100],
    [74, 137, 110],
  ],
  [
    [231, 161, 99],
    [179, 182, 110],
    [83, 154, 146],
  ],
  [
    [233, 218, 135],
    [171, 197, 140],
    [99, 165, 143],
  ],
  [
    [239, 207, 176],
    [222, 155, 149],
    [184, 112, 133],
  ],
  [
    [240, 221, 194],
    [229, 171, 183],
    [204, 118, 157],
  ],
  [
    [233, 220, 190],
    [198, 169, 194],
    [153, 113, 164],
  ],
];

const profile = {
  name: 'Fictional three-level classroom palette — NOT a medical reference',
  synthetic: true,
  pads: names.map((name, index) => ({
    name,
    unit: '',
    references: palettes[index].map((rgb, level) => ({
      label: `Simulated level ${level + 1}`,
      rgb,
    })),
  })),
};

const scenarios = [
  {
    file: '01-light-palette.png',
    title: 'Light palette',
    levels: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    file: '02-mixed-palette.png',
    title: 'Mixed palette',
    levels: [0, 1, 2, 0, 1, 2, 0, 1, 2, 1],
  },
  {
    file: '03-deep-palette.png',
    title: 'Deep palette',
    levels: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  },
  {
    file: '04-alternate-palette.png',
    title: 'Alternate palette',
    levels: [1, 0, 1, 2, 0, 1, 2, 1, 0, 2],
  },
];

let seed = 731;
const noise = () => {
  seed = (1664525 * seed + 1013904223) >>> 0;
  return (seed / 4294967296 - 0.5) * 4;
};
const width = 1200,
  height = 120;
const manifest = [];
const composites = [];

for (const [scenarioIndex, scenario] of scenarios.entries()) {
  const pixels = Buffer.alloc(width * height * 3);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pad = Math.floor(x / 120),
        localX = x % 120;
      const onPad = localX >= 18 && localX < 102 && y >= 12 && y < 108;
      const reference = palettes[pad][scenario.levels[pad]];
      const offsets = [4 + scenarioIndex, -3 - (pad % 2), 2 + (pad % 3)];
      const grain = noise();
      for (let channel = 0; channel < 3; channel++) {
        const value = onPad ? reference[channel] + offsets[channel] + grain : 243 + grain;
        pixels[(y * width + x) * 3 + channel] = Math.round(
          Math.max(0, Math.min(255, value)),
        );
      }
    }
  }
  const image = await sharp(pixels, { raw: { width, height, channels: 3 } })
    .png()
    .toBuffer();
  const { parameters } = await analyze(image, profile, {
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  });
  parameters.forEach((parameter, pad) => {
    if (
      parameter.label !== `Simulated level ${scenario.levels[pad] + 1}` ||
      parameter.deltaE === 0
    ) {
      throw new Error(`Unexpected match in ${scenario.file}, pad ${pad + 1}`);
    }
  });
  await writeFile(output + scenario.file, image);
  manifest.push({
    file: scenario.file,
    title: scenario.title,
    synthetic: true,
    crop: { x: 0, y: 0, width: 1, height: 1 },
    expected: parameters,
  });
  composites.push({ input: image, left: 40, top: 95 + scenarioIndex * 185 });
}

const headings = scenarios
  .map(
    (scenario, index) =>
      `<text x="40" y="${78 + index * 185}" font-size="20" fill="#334155">${scenario.file} — ${scenario.title}</text>`,
  )
  .join('');
const overlay = Buffer.from(
  `<svg width="1280" height="830"><rect width="1280" height="830" fill="#f8fafc"/><text x="40" y="32" font-family="sans-serif" font-size="20" fill="#0f172a">SYNTHETIC STRIP SAMPLES — fictional colours, not medical readings</text><g font-family="sans-serif">${headings}</g><text x="40" y="810" font-family="sans-serif" font-size="16" fill="#64748b">Pad order: ${names.join(' / ')}</text></svg>`,
);
await sharp(overlay)
  .composite(composites)
  .png()
  .toFile(output + 'preview.png');
await writeFile(
  output + 'reference-profile.json',
  JSON.stringify(profile, null, 2) + '\n',
);
await writeFile(
  output + 'expected-results.json',
  JSON.stringify(manifest, null, 2) + '\n',
);
await writeFile(
  output + 'README.md',
  `# Synthetic strip samples\n\nThese are programmatically generated classroom images, not real used strips or manufacturer reference colours. The three simulated levels have no clinical meaning. All images contain ten horizontal, evenly spaced pads matching reference-profile.json.\n\n## Use in the app\n\n1. Sign in and select a patient at /analysis.\n2. Upload reference-profile.json as the reference profile. Do not use the older built-in two-colour example profile.\n3. Upload one numbered PNG (not preview.png).\n4. Drag over the entire image, from top left to bottom right. The photo is already cropped to the ten-pad row.\n5. Analyse and save.\n\nThe images include subtle texture and small offsets from reference colours, so Delta E will be nonzero. Expected per-pad matches, RGB and distances are in expected-results.json. These are deterministic computational checks, not measured urine values.\n\nRegenerate and verify all four images from the repository root with npm run samples. preview.png is a contact sheet only.\n`,
);
console.log('Generated and verified four synthetic samples in samples/.');
