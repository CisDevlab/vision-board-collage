import { useRef, useState } from 'react';
import { ImagePlus, X, Link } from 'lucide-react';
import SubGridCell from './SubGridCell';
import subGridTemplates, { SUB_AREAS } from '../data/subGridTemplates';

const DEFAULT_SUB_CELL = { image: null, objectFit: 'cover' };

export default function BoardCell({ cell, cellData, area, onUpdate, isSelected, onSelect }) {
  const fileRef = useRef(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const { image, text, fontSize, fontColor, textAlign, fontFamily, textPosition, objectFit, isSubGrid, subGridCount, subGridLayout, subCells } = cellData;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onUpdate(cell.id, { image: ev.target.result });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    onUpdate(cell.id, { image: null });
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = urlValue.trim();
    if (url) {
      onUpdate(cell.id, { image: url });
      setUrlValue('');
      setShowUrlInput(false);
    }
  };

  const handleUrlToggle = (e) => {
    e.stopPropagation();
    setShowUrlInput(!showUrlInput);
    setUrlValue('');
  };

  const handleSubCellUpdate = (subIdx, updates) => {
    const currentSubs = subCells || {};
    onUpdate(cell.id, {
      subCells: {
        ...currentSubs,
        [subIdx]: { ...(currentSubs[subIdx] || DEFAULT_SUB_CELL), ...updates },
      },
    });
  };

  // Sub-grid rendering
  if (isSubGrid) {
    const count = subGridCount || 2;
    const layoutIdx = subGridLayout || 0;
    const templates = subGridTemplates[count] || subGridTemplates[2];
    const tmpl = templates[layoutIdx] || templates[0];
    const subs = subCells || {};

    return (
      <div
        className={`board-cell sub-grid-parent ${isSelected ? 'selected' : ''}`}
        style={{ gridArea: area }}
        onClick={() => onSelect(cell.id)}
      >
        <div
          className="sub-grid"
          style={{ display: 'grid', gridTemplate: tmpl.gridTemplate, gap: '2px' }}
        >
          {Array.from({ length: count }, (_, i) => (
            <SubGridCell
              key={i}
              area={SUB_AREAS[i]}
              subCellData={subs[i] || DEFAULT_SUB_CELL}
              onUpdate={(updates) => handleSubCellUpdate(i, updates)}
            />
          ))}
        </div>

        {text && (
          <div
            className={`cell-text-overlay position-${textPosition || 'bottom'}`}
            style={{
              fontSize: `${fontSize || 16}px`,
              color: fontColor || '#ffffff',
              textAlign: textAlign || 'center',
              fontFamily: fontFamily || 'Inter',
            }}
          >
            {text}
          </div>
        )}
      </div>
    );
  }

  // Normal single-image rendering
  return (
    <div
      className={`board-cell ${isSelected ? 'selected' : ''} ${image ? 'has-image' : ''}`}
      style={{ gridArea: area }}
      onClick={() => onSelect(cell.id)}
    >
      {image ? (
        <>
          <img src={image} alt="" className="cell-image" style={{ objectFit: objectFit || 'cover' }} />
          <button className="remove-image-btn" onClick={handleRemoveImage} title="Remove image">
            <X size={14} />
          </button>
        </>
      ) : (
        <div className="empty-cell">
          {showUrlInput ? (
            <form className="url-form" onClick={(e) => e.stopPropagation()} onSubmit={handleUrlSubmit}>
              <input
                type="url"
                className="url-input"
                value={urlValue}
                onChange={(e) => setUrlValue(e.target.value)}
                placeholder="Paste image URL..."
                autoFocus
              />
              <div className="url-actions">
                <button type="submit" className="url-btn confirm">Add</button>
                <button type="button" className="url-btn cancel" onClick={handleUrlToggle}>Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <button className="upload-btn" onClick={() => fileRef.current?.click()}>
                <ImagePlus size={28} strokeWidth={1.5} />
                <span>Upload Image</span>
              </button>
              <button className="link-btn" onClick={handleUrlToggle}>
                <Link size={14} strokeWidth={1.5} />
                <span>Paste URL</span>
              </button>
            </>
          )}
        </div>
      )}

      {text && (
        <div
          className={`cell-text-overlay position-${textPosition || 'bottom'}`}
          style={{
            fontSize: `${fontSize || 16}px`,
            color: fontColor || '#ffffff',
            textAlign: textAlign || 'center',
            fontFamily: fontFamily || 'Inter',
          }}
        >
          {text}
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
    </div>
  );
}
