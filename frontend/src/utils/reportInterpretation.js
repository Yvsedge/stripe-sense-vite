// These are descriptions of a fictional palette, never clinical reference intervals.
const levels = {
  'Simulated level 1': {
    key: 'lower',
    title: 'Lower colour estimate',
    detail:
      'Closest to colour category 1. This does not indicate below-normal concentration or confirm a normal medical result.',
  },
  'Simulated level 2': {
    key: 'middle',
    title: 'Intermediate colour estimate',
    detail:
      'Closest to colour category 2. Review the reference match; a medical interpretation requires validated reference values.',
  },
  'Simulated level 3': {
    key: 'higher',
    title: 'Higher colour estimate',
    detail:
      'Closest to colour category 3. Review this higher-category match with a doctor; it does not establish abnormality or urgency.',
  },
};

export const parameterDescriptions = {
  Glucose: 'Urine sugar screening marker.',
  Bilirubin: 'A bile pigment associated with red blood cell breakdown.',
  Ketones: 'Substances produced during fat metabolism.',
  'Specific gravity': 'A measure related to how concentrated urine is.',
  Blood: 'Screening for a blood-related reaction on the pad.',
  pH: 'How acidic or alkaline urine is. Higher pH means more alkaline, not automatically more severe.',
  Protein: 'Screening for protein in urine.',
  Urobilinogen: 'A pigment formed during bilirubin breakdown.',
  Nitrite:
    'A screening marker that may be associated with certain bacteria. It is not a general severity scale.',
  Leukocytes: 'Screening for a white-blood-cell-related reaction.',
};

export function interpretParameter(parameter, synthetic) {
  if (parameter.ambiguous)
    return {
      key: 'review',
      title: 'Colour match needs review',
      detail:
        'Two reference colours are nearly tied. The level is uncertain; inspect the crop and supplied references.',
    };
  if (synthetic === true && levels[parameter.label]) return levels[parameter.label];
  return {
    key: 'unknown',
    title: 'Not classified',
    detail:
      'The supplied category has no validated interpretation rule. Its order or colour alone cannot establish low, normal, high or critical.',
  };
}

export function summarizeReport(test) {
  const groups = { lower: [], middle: [], higher: [], review: [], unknown: [] };
  for (const parameter of test.parameters)
    groups[interpretParameter(parameter, test.synthetic).key].push(parameter.name);
  return groups;
}

export function demoAssessment(test) {
  const groups = summarizeReport(test);
  if (groups.higher.length)
    return {
      key: 'higher',
      title: 'Higher-category colour matches detected',
      names: groups.higher,
    };
  if (groups.middle.length)
    return {
      key: 'middle',
      title: 'Intermediate colour matches detected',
      names: groups.middle,
    };
  if (groups.review.length || groups.unknown.length || !test.parameters.length)
    return {
      key: 'unknown',
      title: 'Interpretation incomplete',
      names: [...groups.review, ...groups.unknown],
    };
  return { key: 'lower', title: 'Lower-category colour matches', names: groups.lower };
}

export const displayCategory = (label) =>
  label.replace(/^Simulated level ([123])$/, 'Colour category $1');
export const displayProfile = (name, synthetic) =>
  synthetic ? 'Colour reference profile' : name;
