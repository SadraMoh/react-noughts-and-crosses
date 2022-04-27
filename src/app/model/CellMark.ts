export type CellMark = '' | 'nought' | 'cross';

export type CellMarkSymbol = '' | 'O' | 'X';

export function markToSymbol(mark: CellMark): CellMarkSymbol {
  switch (mark) {
    case "nought":
      return 'O';

    case "cross":
      return 'X';

    default:
      return '';
  }
}

