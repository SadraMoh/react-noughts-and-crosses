import { CellMark, CellMarkSymbol, markToSymbol } from "./model/CellMark";

type CellProps = {
  turn: CellMark;
  mark: CellMark;
  turnPlayed: (mark: CellMark) => void;
};

function Cell({ turn, mark, turnPlayed }: CellProps) {

  function cellClick() {
    turnPlayed(turn);
  }

  return (
    <button
      onClick={cellClick}
      disabled={Boolean(mark)}
      style={{ color: mark == "nought" ? "red" : "blue" }}
    >
      {markToSymbol(mark)}
    </button>
  );
}

export default Cell;
