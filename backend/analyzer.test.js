import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { analyze, demoProfile, validateProfile, rgbToLab } from './analyzer.js';

test('Ten known pad colours map to the correct reference categories', async () => {
  const pixels = Buffer.alloc(1000 * 100 * 3);
  for (let y = 0; y < 100; y++)
    for (let x = 0; x < 1000; x++) {
      const i = Math.floor(x / 100),
        rgb = demoProfile.pads[i].references[i % 2].rgb;
      for (let c = 0; c < 3; c++) pixels[(y * 1000 + x) * 3 + c] = rgb[c];
    }
  const image = await sharp(pixels, { raw: { width: 1000, height: 100, channels: 3 } })
    .png()
    .toBuffer();
  const { parameters } = await analyze(image, demoProfile, {
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  });
  assert.equal(parameters.length, 10);
  parameters.forEach((p, i) => {
    assert.equal(p.label, i % 2 ? 'Reference B' : 'Reference A');
    assert.equal(p.deltaE, 0);
  });
  await assert.rejects(
    analyze(image, demoProfile, { x: 0.9, y: 0, width: 0.5, height: 1 }),
    /valid strip/,
  );
});
test('Reject invalid images and reference profiles', async () => {
  await assert.rejects(
    analyze(Buffer.from('not an image'), demoProfile, {
      x: 0,
      y: 0,
      width: 1,
      height: 1,
    }),
  );
  assert.throws(() => validateProfile({ name: 'bad', pads: [] }));
  assert.throws(() =>
    validateProfile({
      ...demoProfile,
      pads: demoProfile.pads.map((p) => ({
        ...p,
        references: [{ label: 'bad', rgb: [999, 0, 0] }],
      })),
    }),
  );
});
test('CIELAB white and black conversion', () => {
  assert.ok(Math.abs(rgbToLab([255, 255, 255])[0] - 100) < 0.001);
  assert.equal(rgbToLab([0, 0, 0])[0], 0);
});
