export type CellMark = '' | 'nought' | 'cross';

export type CellMarkSymbol = '' | 'O' | 'X';

/**
 * convert a mark into it's symbol representation
 * @param mark the mark type
 * @returns the symbol representation of the passed in mark
 */
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