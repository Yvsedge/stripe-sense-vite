import {
  interpretParameter,
  parameterDescriptions,
  summarizeReport,
  demoAssessment,
} from '../utils/reportInterpretation';

export default function ResultExplanation({ test }) {
  const groups = summarizeReport(test);
  const assessment = demoAssessment(test);
  return (
    <section className="panel result-explanation">
      <div className="section-heading">
        <h2>What do these results mean?</h2>
        <span className="pill">Colour-based estimates</span>
      </div>
      <p className="muted">
        Results estimate the closest category in the supplied colour reference. Categories
        describe colour matches, not normal ranges or measured concentrations. These
        estimates are not clinically validated.
      </p>
      <div className="result-level-grid">
        {[
          ['lower', 'Lower colour category', 'Category 1'],
          ['middle', 'Intermediate colour category', 'Category 2'],
          ['higher', 'Higher colour category', 'Category 3'],
        ].map(([key, title, label]) => (
          <div key={key} className={`result-level result-${key}`}>
            <span>{title}</span>
            <strong>{groups[key].length}</strong>
            <small>
              {label} · {groups[key].join(', ') || 'No pads classified'}
            </small>
          </div>
        ))}
      </div>
      <div className={`demo-assessment result-${assessment.key}`} role="status">
        <strong>{assessment.title}</strong>
        {assessment.names.length > 0 && <p>{assessment.names.join(', ')}</p>}
        <p>
          {assessment.key === 'higher'
            ? 'Review the listed higher-category matches and discuss the results with a doctor. This is not a medical emergency assessment.'
            : assessment.key === 'middle'
              ? 'The listed pads match the intermediate reference category. Inspect their reference matches.'
              : assessment.key === 'lower'
                ? 'All classified pads match the lower reference category. This is not confirmation of a medically normal result.'
                : 'Some categories have no rule or have uncertain matches; a complete result cannot be assigned.'}
        </p>
      </div>
      <div className="critical-assessment">
        <strong>Always consult a doctor</strong>
        <p>
          Always consult a qualified doctor about your results. This application provides
          unvalidated colour-based estimates, not a diagnosis. It cannot determine whether
          a result is normal, abnormal or critical. Do not use it to start, stop or change
          treatment.
        </p>
      </div>
      {(groups.review.length > 0 || groups.unknown.length > 0) && (
        <p className="muted">
          {groups.review.length} uncertain colour matches; {groups.unknown.length}{' '}
          categories without an interpretation rule. These are excluded from the status
          counts.
        </p>
      )}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Basic interpretation</th>
              <th>Explanation</th>
            </tr>
          </thead>
          <tbody>
            {test.parameters.map((parameter, index) => {
              const interpretation = interpretParameter(parameter, test.synthetic);
              return (
                <tr key={index}>
                  <td>
                    <strong>{parameter.name}</strong>
                    <small>
                      {parameterDescriptions[parameter.name] ||
                        'User-defined strip parameter.'}
                    </small>
                  </td>
                  <td>
                    <span className={`result-status result-${interpretation.key}`}>
                      {interpretation.title}
                    </span>
                  </td>
                  <td>{interpretation.detail}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <details className="report-help">
        <summary>How to read the colour measurements</summary>
        <ul>
          <li>
            <strong>Measured colour:</strong> average RGB values sampled from the centre
            of the pad. RGB describes colour, not analyte concentration.
          </li>
          <li>
            <strong>Reference colour:</strong> the closest swatch in that parameter’s
            supplied chart.
          </li>
          <li>
            <strong>Delta E:</strong> the distance between those colours. Zero is an exact
            match; larger numbers mean a less similar colour. It is not a concentration,
            severity score or confidence percentage.
          </li>
          <li>
            <strong>Review:</strong> two reference colours are almost equally close. A
            blank review flag does not establish medical safety.
          </li>
          <li>
            <strong>Colour order:</strong> darker does not universally mean higher. Each
            parameter and strip brand has its own colour scale.
          </li>
        </ul>
      </details>
      <p className="muted">
        General background:{' '}
        <a
          className="text-link"
          href="https://medlineplus.gov/ency/article/003579.htm"
          target="_blank"
          rel="noreferrer"
        >
          MedlinePlus — Urinalysis
        </a>
        . General information does not validate this application's colour estimates.
      </p>
    </section>
  );
}
