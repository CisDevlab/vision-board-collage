import templates from '../data/templates';

function MiniGrid({ template, isActive }) {
  const areas = template.gridTemplate;
  const cellCount = template.cells.length;

  return (
    <div
      className={`template-mini ${isActive ? 'active' : ''}`}
      style={{ display: 'grid', gridTemplate: areas, gap: '2px' }}
    >
      {template.cells.map((cell) => (
        <div
          key={cell.id}
          className="template-mini-cell"
          style={{ gridArea: cell.area }}
        />
      ))}
    </div>
  );
}

export default function TemplatePicker({ cellCount, templateIndex, onCountChange, onTemplateChange }) {
  const counts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const available = templates[cellCount] || [];

  return (
    <div className="template-picker">
      <div className="picker-section">
        <label className="picker-label">Number of Cells</label>
        <div className="count-selector">
          {counts.map((n) => (
            <button
              key={n}
              className={`count-btn ${cellCount === n ? 'active' : ''}`}
              onClick={() => onCountChange(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {available.length > 1 && (
        <div className="picker-section">
          <label className="picker-label">Layout</label>
          <div className="layout-options">
            {available.map((tmpl, idx) => (
              <button
                key={idx}
                className={`layout-btn ${templateIndex === idx ? 'active' : ''}`}
                onClick={() => onTemplateChange(idx)}
                title={tmpl.name}
              >
                <MiniGrid template={tmpl} isActive={templateIndex === idx} />
                <span className="layout-name">{tmpl.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
