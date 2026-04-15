import { useState, useRef, useCallback } from 'react';
import LoginScreen from './components/LoginScreen';
import BoardHeader from './components/BoardHeader';
import TemplatePicker from './components/TemplatePicker';
import BoardCell from './components/BoardCell';
import CellEditor from './components/CellEditor';
import useLocalStorage from './hooks/useLocalStorage';
import templates from './data/templates';
import './App.css';

const DEFAULT_CELL = {
  image: null,
  text: '',
  fontSize: 18,
  fontColor: '#ffffff',
  textAlign: 'center',
  fontFamily: 'Inter',
  textPosition: 'bottom',
};

function createCellsData(count) {
  const data = {};
  for (let i = 0; i < count; i++) {
    data[i] = { ...DEFAULT_CELL };
  }
  return data;
}

function App() {
  const [boardData, setBoardData] = useLocalStorage('vision-board', {
    title: 'My Vision Board',
    cellCount: 4,
    templateIndex: 0,
    cells: createCellsData(4),
  });

  const [authed, setAuthed] = useState(() => localStorage.getItem('vb-auth') === 'true');
  const [selectedCell, setSelectedCell] = useState(null);
  const boardRef = useRef(null);

  const { title, cellCount, templateIndex, cells } = boardData;
  const templateList = templates[cellCount] || [];
  const currentTemplate = templateList[templateIndex] || templateList[0];

  const updateBoard = useCallback((updates) => {
    setBoardData((prev) => ({ ...prev, ...updates }));
  }, [setBoardData]);

  const handleCountChange = (count) => {
    const existingCells = boardData.cells;
    const newCells = {};
    for (let i = 0; i < count; i++) {
      newCells[i] = existingCells[i] || { ...DEFAULT_CELL };
    }
    const maxIdx = (templates[count]?.length || 1) - 1;
    updateBoard({
      cellCount: count,
      templateIndex: Math.min(boardData.templateIndex, maxIdx),
      cells: newCells,
    });
    setSelectedCell(null);
  };

  const handleTemplateChange = (idx) => {
    updateBoard({ templateIndex: idx });
  };

  const handleCellUpdate = (cellId, updates) => {
    setBoardData((prev) => ({
      ...prev,
      cells: {
        ...prev.cells,
        [cellId]: { ...prev.cells[cellId], ...updates },
      },
    }));
  };

  const handleTitleChange = (newTitle) => {
    updateBoard({ title: newTitle });
  };

  const handleReset = () => {
    if (window.confirm('Reset the entire board? This cannot be undone.')) {
      setBoardData({
        title: 'My Vision Board',
        cellCount: 4,
        templateIndex: 0,
        cells: createCellsData(4),
      });
      setSelectedCell(null);
    }
  };

  const handleExport = async () => {
    const board = boardRef.current;
    if (!board) return;
    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(board, {
        backgroundColor: '#0f0f0f',
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = `${title || 'vision-board'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch {
      alert('Export failed. Please try again.');
    }
  };

  const handleSelectCell = (id) => {
    setSelectedCell(selectedCell === id ? null : id);
  };

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} />;
  }

  return (
    <div className="app">
      <BoardHeader
        title={title}
        onTitleChange={handleTitleChange}
        onExport={handleExport}
        onReset={handleReset}
      />

      <div className="app-body">
        <aside className="sidebar">
          <TemplatePicker
            cellCount={cellCount}
            templateIndex={templateIndex}
            onCountChange={handleCountChange}
            onTemplateChange={handleTemplateChange}
          />

          {selectedCell !== null && cells[selectedCell] && (
            <CellEditor
              cellId={selectedCell}
              cellData={cells[selectedCell]}
              onUpdate={handleCellUpdate}
            />
          )}

          {selectedCell === null && (
            <div className="sidebar-hint">
              <p>Click a cell to edit its text and style</p>
            </div>
          )}
        </aside>

        <main className="board-container">
          <div
            ref={boardRef}
            className="board"
            style={{
              display: 'grid',
              gridTemplate: currentTemplate?.gridTemplate,
              gap: '4px',
            }}
          >
            {currentTemplate?.cells.map((cell) => (
              <BoardCell
                key={cell.id}
                cell={cell}
                cellData={cells[cell.id] || DEFAULT_CELL}
                area={cell.area}
                onUpdate={handleCellUpdate}
                isSelected={selectedCell === cell.id}
                onSelect={handleSelectCell}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
