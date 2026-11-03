import test from 'node:test';
import assert from 'node:assert/strict';
import {
  interpretParameter,
  summarizeReport,
  demoAssessment,
  displayCategory,
} from '../frontend/src/utils/reportInterpretation.js';

test('Presentation uses colour estimates without changing stored results', () => {
  assert.equal(displayCategory('Simulated level 3'), 'Colour category 3');
  assert.equal(displayCategory('Negative'), 'Negative');
  assert.equal(
    interpretParameter({ label: 'Simulated level 3' }, true).title,
    'Higher colour estimate',
  );
});

test('Demo alerts prioritize markedly abnormal patterns without classifying real results', () => {
  const report = (labels) => ({
    synthetic: true,
    parameters: labels.map((label) => ({ name: 'Demo pad', label })),
  });
  assert.equal(demoAssessment(report(['Simulated level 1'])).key, 'lower');
  assert.equal(
    demoAssessment(report(['Simulated level 1', 'Simulated level 2'])).key,
    'middle',
  );
  assert.equal(
    demoAssessment(report(['Simulated level 2', 'Simulated level 3'])).key,
    'higher',
  );
  assert.equal(
    demoAssessment({ ...report(['Simulated level 3']), synthetic: false }).key,
    'unknown',
  );
  assert.equal(demoAssessment(report([])).key, 'unknown');
  assert.equal(demoAssessment(report(['Reference A'])).key, 'unknown');
});

test('Only explicit synthetic levels are classified, never arbitrary chart order', () => {
  assert.equal(interpretParameter({ label: 'Simulated level 3' }, true).key, 'higher');
  assert.equal(interpretParameter({ label: 'Simulated level 1' }, true).key, 'lower');
  assert.equal(interpretParameter({ label: 'Simulated level 2' }, true).key, 'middle');
  assert.equal(interpretParameter({ label: 'Simulated level 3' }, false).key, 'unknown');
  assert.equal(interpretParameter({ label: 'Reference B' }, true).key, 'unknown');
  assert.equal(interpretParameter({ label: 'Positive' }, false).key, 'unknown');
});

test('Ambiguous matches are not counted as known levels', () => {
  const summary = summarizeReport({
    synthetic: true,
    parameters: [
      { name: 'Glucose', label: 'Simulated level 1' },
      { name: 'Protein', label: 'Simulated level 2' },
      { name: 'Ketones', label: 'Simulated level 3' },
      { name: 'pH', label: 'Simulated level 3', ambiguous: true },
      { name: 'Blood', label: 'Reference A' },
    ],
  });
  assert.deepEqual(summary, {
    lower: ['Glucose'],
    middle: ['Protein'],
    higher: ['Ketones'],
    review: ['pH'],
    unknown: ['Blood'],
  });
});
