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
  // to track every played turn
  const [history, setHistory] = useState<History[]>([firstState]);

  // the selected history
  const [currentEntry, setCurrentEntry] = useState<History>(firstState);

  function moveToEntry(entry: History) {
    const selectedIndex = history.indexOf(entry);

    setCurrentEntry(entry);
  }

  function cellChanged(mark: CellMark, i: number, j: number) {
    // skip if game has ended
    if (Boolean(currentEntry.winner)) return;

    const nextMap: Map = [...currentEntry.map];
    nextMap[i][j] = mark;

    debugger

    const nextEntry: History = {
      map: nextMap,
      turn: currentEntry.turn === "cross" ? "nought" : "cross",
      winner: "",
    };

    // check for win
    const flattenedMap = nextEntry.map.flat();
    for (const scenario of winScenarios) {
      if (scenario.every((cell) => flattenedMap[cell] === currentEntry.turn))
        nextEntry.winner = currentEntry.turn;
    }

    // update state
    setHistory([...history, nextEntry]);
    setCurrentEntry(nextEntry);
  }

  return (
    <>
      {Boolean(currentEntry.winner) && <h1>{currentEntry.winner} WINS!</h1>}
      <div className="row">
        <Table
          gameState={currentEntry}
          cellChanged={(entry, i, j) => cellChanged(entry, i, j)}
        />
        <Log history={history} entrySelected={(entry) => moveToEntry(entry)} />
      </div>
    </>
  );
}

export default App;
