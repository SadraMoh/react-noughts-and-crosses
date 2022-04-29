import { useState } from "react";
import Log from "./Log";
import { CellMark } from "./model/CellMark";
import { History, Map, winScenarios } from "./model/Game";
import Table from "./Table";

const firstState: History = {
  map: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  // odd turns are cross
  turn: "cross",
  winner: "",
};

function App() {
  /** history stack to track every move */
  const [history, setHistory] = useState<History[]>([firstState]);

  /** the selected state */
  const [currentState, setCurrentState] = useState(firstState);

  /**
   * move to a specific entry in the stack
   * @param entry the entry to move to
   */
  function moveToEntry(entry: History) {
    setCurrentState(entry);
  }

  /**
   * run when a cell is updated
   * @param mark new mark
   */
  function cellChanged(mark: CellMark, i: number, j: number) {
    // skip if game has ended
    if (Boolean(currentState.winner)) return;

    // decouple and then clone inner arrays from the current state and prepare them for the new state
    let nextMap: Map = [
      [...currentState.map[0]],
      [...currentState.map[1]],
      [...currentState.map[2]],
    ];
    nextMap[i][j] = mark;

    // toggle turn
    const nextTurn: CellMark =
      currentState.turn == "cross" ? "nought" : "cross";

    // check for win
    let winner: CellMark = "";
    const flattenedMap = nextMap.flat();
    for (const scenario of winScenarios)
      if (scenario.every((cell) => flattenedMap[cell] === currentState.turn))
        winner = currentState.turn;

    const nextState: History = {
      map: nextMap,
      turn: nextTurn,
      winner,
    };

    // clear items after the selected state from history stack
    setHistory((prevHistory) =>
      prevHistory.slice(0, prevHistory.indexOf(currentState) + 1)
    );
    // add nextState to the history stack
    setHistory((prevHistory) => prevHistory.concat(nextState));

    // update current state
    setCurrentState(nextState);
  }

  return (
    <>
      {Boolean(currentState.winner) && <h1>{currentState.winner} WINS!</h1>}
      <div className="row">
        <Table
          gameState={currentState}
          cellChanged={(entry, i, j) => cellChanged(entry, i, j)}
        />
        <Log history={history} entrySelected={(entry) => moveToEntry(entry)} />
      </div>
    </>
  );
}

export default App;