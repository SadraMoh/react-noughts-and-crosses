import Cell from "./Cell";
import { CellMark } from "./model/CellMark";
import { History } from "./model/Game";

type TableProps = {
  gameState: History;
  cellChanged: (mark: CellMark, i: number, j: number) => void;
};

function Table({ gameState, cellChanged }: TableProps) {
  const { map, turn, winner } = gameState;

  return (
    <>
      <table style={{ marginBottom: "auto" }}> 
        <tbody>
          {map.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>
                  <Cell
                    mark={cell}
                    turn={turn}
                    turnPlayed={(mark) => cellChanged(mark, i, j)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
