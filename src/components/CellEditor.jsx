import { useState } from 'react';
import { AlignLeft, AlignCenter, AlignRight, ArrowUp, ArrowDown, Minus, Maximize, Minimize, Square, Grid2x2, Image } from 'lucide-react';
import subGridTemplates from '../data/subGridTemplates';

const FONT_OPTIONS = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Playfair Display', label: 'Playfair Display' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Courier New', label: 'Courier New' },
];

const POSITION_OPTIONS = [
  { value: 'top', label: 'Top', icon: ArrowUp },
  { value: 'center', label: 'Center', icon: Minus },
  { value: 'bottom', label: 'Bottom', icon: ArrowDown },
];

function SubGridMini({ template, isActive }) {
  const areas = ['a', 'b', 'c', 'd'].slice(0, template.count);
  return (
    <div
      className={`template-mini sub-mini ${isActive ? 'active' : ''}`}
      style={{ display: 'grid', gridTemplate: template.gridTemplate, gap: '1px' }}
    >
      {areas.map((a) => (
        <div key={a} className="template-mini-cell" style={{ gridArea: a }} />
      ))}
    </div>
  );
}

const FIT_OPTIONS = [
  { value: 'cover', label: 'Cover', Icon: Maximize },
  { value: 'contain', label: 'Contain', Icon: Minimize },
  { value: 'fill', label: 'Fill', Icon: Square },
];

export default function CellEditor({ cellId, cellData, onUpdate }) {
  const { text, fontSize, fontColor, textAlign, fontFamily, textPosition, objectFit, image, isSubGrid, subGridCount, subGridLayout, subCells } = cellData;
  const [activeSubCell, setActiveSubCell] = useState(0);

  const update = (field, value) => {
    onUpdate(cellId, { [field]: value });
  };

  const updateSubCell = (subIdx, updates) => {
    const current = subCells || {};
    onUpdate(cellId, {
      subCells: {
        ...current,
        [subIdx]: { ...(current[subIdx] || {}), ...updates },
      },
    });
  };

  const toggleSubGrid = (enabled) => {
    if (enabled) {
      onUpdate(cellId, {
        isSubGrid: true,
        subGridCount: subGridCount || 2,
        subGridLayout: subGridLayout || 0,
        subCells: cellData.subCells || {},
      });
    } else {
      onUpdate(cellId, { isSubGrid: false });
    }
  };

  const handleSubGridCountChange = (count) => {
    const maxLayout = (subGridTemplates[count]?.length || 1) - 1;
    onUpdate(cellId, {
      subGridCount: count,
      subGridLayout: Math.min(subGridLayout || 0, maxLayout),
    });
  };

  const currentCount = subGridCount || 2;
  const availableLayouts = subGridTemplates[currentCount] || [];

  return (
    <div className="cell-editor">
      <h3 className="editor-title">Cell Settings</h3>

      {/* Mode toggle: Single image vs Sub-grid */}
      <div className="editor-section">
        <label className="editor-label">Cell Mode</label>
        <div className="btn-group">
          <button
            className={`btn-group-item ${!isSubGrid ? 'active' : ''}`}
            onClick={() => toggleSubGrid(false)}
          >
            <Image size={16} />
            <span>Single</span>
          </button>
          <button
            className={`btn-group-item ${isSubGrid ? 'active' : ''}`}
            onClick={() => toggleSubGrid(true)}
          >
            <Grid2x2 size={16} />
            <span>Sub-Grid</span>
          </button>
        </div>
      </div>

      {/* Sub-grid settings */}
      {isSubGrid && (
        <>
          <div className="editor-section">
            <label className="editor-label">Sub-Cells</label>
            <div className="btn-group">
              {[2, 3, 4].map((n) => (
                <button
                  key={n}
                  className={`btn-group-item ${currentCount === n ? 'active' : ''}`}
                  onClick={() => { handleSubGridCountChange(n); setActiveSubCell(0); }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {availableLayouts.length > 1 && (
            <div className="editor-section">
              <label className="editor-label">Sub-Layout</label>
              <div className="layout-options">
                {availableLayouts.map((tmpl, idx) => (
                  <button
                    key={idx}
                    className={`layout-btn small ${(subGridLayout || 0) === idx ? 'active' : ''}`}
                    onClick={() => update('subGridLayout', idx)}
                    title={tmpl.name}
                  >
                    <SubGridMini template={tmpl} isActive={(subGridLayout || 0) === idx} />
                    <span className="layout-name">{tmpl.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Per sub-cell image fit */}
          <div className="editor-section">
            <label className="editor-label">Sub-Cell Image Fit</label>
            <div className="btn-group" style={{ marginBottom: 6 }}>
              {Array.from({ length: currentCount }, (_, i) => {
                const sc = (subCells || {})[i];
                const hasImg = sc?.image;
                return (
                  <button
                    key={i}
                    className={`btn-group-item ${activeSubCell === i ? 'active' : ''} ${!hasImg ? 'dim' : ''}`}
                    onClick={() => setActiveSubCell(i)}
                  >
                    Cell {i + 1}
                  </button>
                );
              })}
            </div>
            {(() => {
              const sc = (subCells || {})[activeSubCell];
              if (!sc?.image) return <p className="editor-hint">No image in Cell {activeSubCell + 1}</p>;
              return (
                <div className="btn-group">
                  {FIT_OPTIONS.map(({ value, label, Icon }) => (
                    <button
                      key={value}
                      className={`btn-group-item ${(sc.objectFit || 'cover') === value ? 'active' : ''}`}
                      onClick={() => updateSubCell(activeSubCell, { objectFit: value })}
                    >
                      <Icon size={16} />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              );
            })()}
          </div>
        </>
      )}

      {/* Image fit (only for single image mode with image) */}
      {!isSubGrid && image && (
        <div className="editor-section">
          <label className="editor-label">Image Fit</label>
          <div className="btn-group">
            {FIT_OPTIONS.map(({ value, label, Icon }) => (
              <button
                key={value}
                className={`btn-group-item ${(objectFit || 'cover') === value ? 'active' : ''}`}
                onClick={() => update('objectFit', value)}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="editor-section">
        <label className="editor-label">Text</label>
        <textarea
          className="editor-textarea"
          value={text || ''}
          onChange={(e) => update('text', e.target.value)}
          placeholder="Add your vision text..."
          rows={3}
        />
      </div>

      <div className="editor-section">
        <label className="editor-label">Font Family</label>
        <select
          className="editor-select"
          value={fontFamily || 'Inter'}
          onChange={(e) => update('fontFamily', e.target.value)}
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>
      </div>

      <div className="editor-row">
        <div className="editor-section" style={{ flex: 1 }}>
          <label className="editor-label">Size</label>
          <div className="size-control">
            <input
              type="range"
              min="10"
              max="72"
              value={fontSize || 16}
              onChange={(e) => update('fontSize', Number(e.target.value))}
              className="editor-range"
            />
            <span className="size-value">{fontSize || 16}px</span>
          </div>
        </div>

        <div className="editor-section">
          <label className="editor-label">Color</label>
          <input
            type="color"
            value={fontColor || '#ffffff'}
            onChange={(e) => update('fontColor', e.target.value)}
            className="editor-color"
          />
        </div>
      </div>

      <div className="editor-section">
        <label className="editor-label">Text Align</label>
        <div className="btn-group">
          {[
            { value: 'left', Icon: AlignLeft },
            { value: 'center', Icon: AlignCenter },
            { value: 'right', Icon: AlignRight },
          ].map(({ value, Icon }) => (
            <button
              key={value}
              className={`btn-group-item ${(textAlign || 'center') === value ? 'active' : ''}`}
              onClick={() => update('textAlign', value)}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>

      <div className="editor-section">
        <label className="editor-label">Text Position</label>
        <div className="btn-group">
          {POSITION_OPTIONS.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              className={`btn-group-item ${(textPosition || 'bottom') === value ? 'active' : ''}`}
              onClick={() => update('textPosition', value)}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
