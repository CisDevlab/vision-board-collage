import { useRef, useState } from 'react';
import { ImagePlus, X, Link } from 'lucide-react';

export default function SubGridCell({ area, subCellData, onUpdate }) {
  const fileRef = useRef(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const { image, objectFit } = subCellData;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onUpdate({ image: ev.target.result });
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    onUpdate({ image: null });
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = urlValue.trim();
    if (url) {
      onUpdate({ image: url });
      setUrlValue('');
      setShowUrlInput(false);
    }
  };

  const handleUrlToggle = (e) => {
    e.stopPropagation();
    setShowUrlInput(!showUrlInput);
    setUrlValue('');
  };

  return (
    <div className="sub-grid-cell" style={{ gridArea: area }}>
      {image ? (
        <>
          <img src={image} alt="" className="cell-image" style={{ objectFit: objectFit || 'cover' }} />
          <button className="remove-image-btn sub" onClick={handleRemoveImage} title="Remove image">
            <X size={12} />
          </button>
        </>
      ) : (
        <div className="empty-cell sub-empty">
          {showUrlInput ? (
            <form className="url-form sub-url-form" onClick={(e) => e.stopPropagation()} onSubmit={handleUrlSubmit}>
              <input
                type="url"
                className="url-input"
                value={urlValue}
                onChange={(e) => setUrlValue(e.target.value)}
                placeholder="Image URL..."
                autoFocus
              />
              <div className="url-actions">
                <button type="submit" className="url-btn confirm">Add</button>
                <button type="button" className="url-btn cancel" onClick={handleUrlToggle}>Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <button className="upload-btn sub-upload" onClick={() => fileRef.current?.click()}>
                <ImagePlus size={18} strokeWidth={1.5} />
              </button>
              <button className="link-btn sub-link" onClick={handleUrlToggle}>
                <Link size={10} strokeWidth={1.5} />
                <span>URL</span>
              </button>
            </>
          )}
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
