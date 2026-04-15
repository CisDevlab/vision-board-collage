const subGridTemplates = {
  2: [
    { name: 'Side by Side', gridTemplate: '"a b" 1fr / 1fr 1fr', count: 2 },
    { name: 'Stacked', gridTemplate: '"a" 1fr "b" 1fr / 1fr', count: 2 },
  ],
  3: [
    { name: 'Top + Row', gridTemplate: '"a a" 1fr "b c" 1fr / 1fr 1fr', count: 3 },
    { name: 'Left Big', gridTemplate: '"a b" 1fr "a c" 1fr / 1fr 1fr', count: 3 },
    { name: 'Three Cols', gridTemplate: '"a b c" 1fr / 1fr 1fr 1fr', count: 3 },
  ],
  4: [
    { name: 'Grid 2x2', gridTemplate: '"a b" 1fr "c d" 1fr / 1fr 1fr', count: 4 },
    { name: 'Big Left', gridTemplate: '"a b" 1fr "a c" 1fr "a d" 1fr / 2fr 1fr', count: 4 },
  ],
};

export const SUB_AREAS = ['a', 'b', 'c', 'd'];

export default subGridTemplates;
