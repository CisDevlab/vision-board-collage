import { Sparkles, Download, RotateCcw } from 'lucide-react';

export default function BoardHeader({ title, onTitleChange, onExport, onReset }) {
  return (
    <header className="board-header">
      <div className="header-left">
        <Sparkles size={22} className="header-icon" />
        <input
          type="text"
          className="header-title-input"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="My Vision Board"
        />
      </div>
      <div className="header-actions">
        <button className="header-btn" onClick={onExport} title="Export as image">
          <Download size={18} />
          <span>Export</span>
        </button>
        <button className="header-btn danger" onClick={onReset} title="Reset board">
          <RotateCcw size={18} />
          <span>Reset</span>
        </button>
      </div>
    </header>
  );
}
