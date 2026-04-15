// Each template defines a grid layout for 1-9 cells.
// gridTemplate: CSS grid-template-areas string
// cells: array of { id, area, label }
// The grid uses named areas so cells can span rows/columns freely.

const templates = {
  1: [
    {
      name: 'Full',
      gridTemplate: '"a" 1fr / 1fr',
      cells: [{ id: 0, area: 'a' }],
    },
  ],
  2: [
    {
      name: 'Side by Side',
      gridTemplate: '"a b" 1fr / 1fr 1fr',
      cells: [{ id: 0, area: 'a' }, { id: 1, area: 'b' }],
    },
    {
      name: 'Stacked',
      gridTemplate: '"a" 1fr "b" 1fr / 1fr',
      cells: [{ id: 0, area: 'a' }, { id: 1, area: 'b' }],
    },
  ],
  3: [
    {
      name: 'Top + Bottom Row',
      gridTemplate: '"a a" 1fr "b c" 1fr / 1fr 1fr',
      cells: [{ id: 0, area: 'a' }, { id: 1, area: 'b' }, { id: 2, area: 'c' }],
    },
    {
      name: 'Left + Right Stack',
      gridTemplate: '"a b" 1fr "a c" 1fr / 1fr 1fr',
      cells: [{ id: 0, area: 'a' }, { id: 1, area: 'b' }, { id: 2, area: 'c' }],
    },
    {
      name: 'Three Columns',
      gridTemplate: '"a b c" 1fr / 1fr 1fr 1fr',
      cells: [{ id: 0, area: 'a' }, { id: 1, area: 'b' }, { id: 2, area: 'c' }],
    },
  ],
  4: [
    {
      name: 'Grid 2x2',
      gridTemplate: '"a b" 1fr "c d" 1fr / 1fr 1fr',
      cells: [{ id: 0, area: 'a' }, { id: 1, area: 'b' }, { id: 2, area: 'c' }, { id: 3, area: 'd' }],
    },
    {
      name: 'Big Left + Right Stack',
      gridTemplate: '"a b" 1fr "a c" 1fr "a d" 1fr / 2fr 1fr',
      cells: [{ id: 0, area: 'a' }, { id: 1, area: 'b' }, { id: 2, area: 'c' }, { id: 3, area: 'd' }],
    },
    {
      name: 'Top Banner + Row',
      gridTemplate: '"a a a" 2fr "b c d" 1fr / 1fr 1fr 1fr',
      cells: [{ id: 0, area: 'a' }, { id: 1, area: 'b' }, { id: 2, area: 'c' }, { id: 3, area: 'd' }],
    },
  ],
  5: [
    {
      name: 'Big Top + Bottom Row',
      gridTemplate: '"a a a" 2fr "b c d" 1fr "b c d" 1fr / 1fr 1fr 1fr',
      cells: [{ id: 0, area: 'a' }, { id: 1, area: 'b' }, { id: 2, area: 'c' }, { id: 3, area: 'd' }],
      note: '4-cell variant with big top',
    },
    {
      name: 'Classic 5',
      gridTemplate: '"a a b b" 1fr "a a b b" 1fr "c d d e" 1fr / 1fr 1fr 1fr 1fr',
      cells: [{ id: 0, area: 'a' }, { id: 1, area: 'b' }, { id: 2, area: 'c' }, { id: 3, area: 'd' }, { id: 4, area: 'e' }],
    },
    {
      name: 'Top Row + Big Bottom',
      gridTemplate: '"a b c" 1fr "d d e" 2fr / 1fr 1fr 1fr',
      cells: [{ id: 0, area: 'a' }, { id: 1, area: 'b' }, { id: 2, area: 'c' }, { id: 3, area: 'd' }, { id: 4, area: 'e' }],
    },
  ],
  6: [
    {
      name: 'Grid 3x2',
      gridTemplate: '"a b c" 1fr "d e f" 1fr / 1fr 1fr 1fr',
      cells: [{ id: 0, area: 'a' }, { id: 1, area: 'b' }, { id: 2, area: 'c' }, { id: 3, area: 'd' }, { id: 4, area: 'e' }, { id: 5, area: 'f' }],
    },
    {
      name: 'Grid 2x3',
      gridTemplate: '"a b" 1fr "c d" 1fr "e f" 1fr / 1fr 1fr',
      cells: [{ id: 0, area: 'a' }, { id: 1, area: 'b' }, { id: 2, area: 'c' }, { id: 3, area: 'd' }, { id: 4, area: 'e' }, { id: 5, area: 'f' }],
    },
    {
      name: 'Feature Left',
      gridTemplate: '"a b c" 1fr "a d e" 1fr "a f f" 1fr / 1fr 1fr 1fr',
      cells: [{ id: 0, area: 'a' }, { id: 1, area: 'b' }, { id: 2, area: 'c' }, { id: 3, area: 'd' }, { id: 4, area: 'e' }, { id: 5, area: 'f' }],
    },
  ],
  7: [
    {
      name: 'Hero + Grid',
      gridTemplate: '"a a a" 2fr "b c d" 1fr "e f g" 1fr / 1fr 1fr 1fr',
      cells: [{ id: 0, area: 'a' }, { id: 1, area: 'b' }, { id: 2, area: 'c' }, { id: 3, area: 'd' }, { id: 4, area: 'e' }, { id: 5, area: 'f' }, { id: 6, area: 'g' }],
    },
    {
      name: 'Left Feature + Grid',
      gridTemplate: '"a b c" 1fr "a d e" 1fr "f f g" 1fr / 1fr 1fr 1fr',
      cells: [{ id: 0, area: 'a' }, { id: 1, area: 'b' }, { id: 2, area: 'c' }, { id: 3, area: 'd' }, { id: 4, area: 'e' }, { id: 5, area: 'f' }, { id: 6, area: 'g' }],
    },
  ],
  8: [
    {
      name: 'Grid 4x2',
      gridTemplate: '"a b c d" 1fr "e f g h" 1fr / 1fr 1fr 1fr 1fr',
      cells: [{ id: 0, area: 'a' }, { id: 1, area: 'b' }, { id: 2, area: 'c' }, { id: 3, area: 'd' }, { id: 4, area: 'e' }, { id: 5, area: 'f' }, { id: 6, area: 'g' }, { id: 7, area: 'h' }],
    },
    {
      name: 'Hero + Bottom Grid',
      gridTemplate: '"a a a a" 2fr "b c d e" 1fr "f g g h" 1fr / 1fr 1fr 1fr 1fr',
      cells: [{ id: 0, area: 'a' }, { id: 1, area: 'b' }, { id: 2, area: 'c' }, { id: 3, area: 'd' }, { id: 4, area: 'e' }, { id: 5, area: 'f' }, { id: 6, area: 'g' }, { id: 7, area: 'h' }],
    },
  ],
  9: [
    {
      name: 'Grid 3x3',
      gridTemplate: '"a b c" 1fr "d e f" 1fr "g h i" 1fr / 1fr 1fr 1fr',
      cells: [{ id: 0, area: 'a' }, { id: 1, area: 'b' }, { id: 2, area: 'c' }, { id: 3, area: 'd' }, { id: 4, area: 'e' }, { id: 5, area: 'f' }, { id: 6, area: 'g' }, { id: 7, area: 'h' }, { id: 8, area: 'i' }],
    },
    {
      name: 'Center Feature',
      gridTemplate: '"a b b c" 1fr "d e e f" 2fr "g h h i" 1fr / 1fr 1fr 1fr 1fr',
      cells: [{ id: 0, area: 'a' }, { id: 1, area: 'b' }, { id: 2, area: 'c' }, { id: 3, area: 'd' }, { id: 4, area: 'e' }, { id: 5, area: 'f' }, { id: 6, area: 'g' }, { id: 7, area: 'h' }, { id: 8, area: 'i' }],
    },
  ],
};

export default templates;
