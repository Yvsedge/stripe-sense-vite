import sharp from 'sharp';

export const names = [
  'Glucose',
  'Bilirubin',
  'Ketones',
  'Specific gravity',
  'Blood',
  'pH',
  'Protein',
  'Urobilinogen',
  'Nitrite',
  'Leukocytes',
];
export const demoProfile = {
  name: 'Synthetic classroom example (not a manufacturer chart)',
  synthetic: true,
  pads: names.map((name, i) => ({
    name,
    unit: '',
    references: [
      { label: 'Reference A', rgb: [215 - i * 8, 205 - i * 5, 130 + i * 8] },
      { label: 'Reference B', rgb: [110 + i * 8, 145 - i * 4, 100 + i * 6] },
    ],
  })),
};

export function validateProfile(profile) {
  if (
    !profile ||
    typeof profile.name !== 'string' ||
    profile.name.length > 160 ||
    !Array.isArray(profile.pads) ||
    profile.pads.length !== 10
  )
    throw new Error('A reference profile must have a name and exactly 10 pads.');
  for (const pad of profile.pads) {
    if (
      typeof pad.name !== 'string' ||
      !pad.name ||
      pad.name.length > 80 ||
      (pad.unit !== undefined &&
        (typeof pad.unit !== 'string' || pad.unit.length > 30)) ||
      !Array.isArray(pad.references) ||
      !pad.references.length ||
      pad.references.length > 20
    )
      throw new Error('Each pad needs a name and 1–20 reference colours.');
    for (const ref of pad.references)
      if (
        typeof ref.label !== 'string' ||
        !ref.label ||
        ref.label.length > 80 ||
        !Array.isArray(ref.rgb) ||
        ref.rgb.length !== 3 ||
        ref.rgb.some((v) => !Number.isFinite(v) || v < 0 || v > 255)
      )
        throw new Error(
          'Reference colours require a label and three RGB numbers from 0 to 255.',
        );
  }
  return profile;
}

// Standard sRGB -> CIELAB (D65); matching distance is Delta E 1976.
export function rgbToLab(rgb) {
  const [r, g, b] = rgb.map((v) => {
    v /= 255;
    return v > 0.04045 ? ((v + 0.055) / 1.055) ** 2.4 : v / 12.92;
  });
  const f = (v) => (v > 216 / 24389 ? Math.cbrt(v) : ((24389 / 27) * v + 16) / 116);
  const x = f((r * 0.4124564 + g * 0.3575761 + b * 0.1804375) / 0.95047);
  const y = f(r * 0.2126729 + g * 0.7151522 + b * 0.072175);
  const z = f((r * 0.0193339 + g * 0.119192 + b * 0.9503041) / 1.08883);
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}

export async function analyze(buffer, profile, crop) {
  validateProfile(profile);
  const image = sharp(buffer, { limitInputPixels: 25000000 })
    .rotate()
    .toColourspace('srgb');
  const normalized = await image.png().toBuffer();
  const { width, height } = await sharp(normalized).metadata();
  if (
    !crop ||
    ['x', 'y', 'width', 'height'].some((k) => !Number.isFinite(crop[k])) ||
    crop.x < 0 ||
    crop.y < 0 ||
    crop.width <= 0 ||
    crop.height <= 0 ||
    crop.x + crop.width > 1.00001 ||
    crop.y + crop.height > 1.00001
  )
    throw new Error('Select a valid strip rectangle within the photo.');
  const left = Math.round(crop.x * width),
    top = Math.round(crop.y * height);
  const w = Math.min(Math.round(crop.width * width), width - left),
    h = Math.min(Math.round(crop.height * height), height - top);
  if (w < 100 || h < 10 || w < h * 3)
    throw new Error(
      'Crop a horizontal row of 10 pads, at least 100 × 10 pixels, excluding the handle.',
    );
  const parameters = [];
  for (let i = 0; i < 10; i++) {
    const sizeX = Math.max(1, Math.floor((w / 10) * 0.5)),
      sizeY = Math.max(1, Math.floor(h * 0.5));
    const region = {
      left: left + Math.floor(((i + 0.5) * w) / 10 - sizeX / 2),
      top: top + Math.floor((h - sizeY) / 2),
      width: sizeX,
      height: sizeY,
    };
    const sampled = await sharp(normalized).extract(region).png().toBuffer();
    const stats = await sharp(sampled).stats();
    const rgb = stats.channels.slice(0, 3).map((c) => Math.round(c.mean));
    const lab = rgbToLab(rgb),
      pad = profile.pads[i];
    const matches = pad.references
      .map((ref) => ({
        ...ref,
        distance: Math.hypot(...rgbToLab(ref.rgb).map((v, j) => v - lab[j])),
      }))
      .sort((a, b) => a.distance - b.distance);
    parameters.push({
      name: pad.name,
      unit: pad.unit || '',
      label: matches[0].label,
      rgb,
      referenceRgb: matches[0].rgb,
      deltaE: Number(matches[0].distance.toFixed(2)),
      ambiguous: matches.length > 1 && matches[1].distance - matches[0].distance < 3,
    });
  }
  return { normalized, parameters };
}
