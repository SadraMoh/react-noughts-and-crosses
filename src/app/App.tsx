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

  const [currentState, setCurrentState] = useState(firstState);

  function moveToEntry(entry: History) {
    const selectedIndex = history.indexOf(entry);
    setCurrentState(history[selectedIndex]);
  }

  function cellChanged(mark: CellMark, i: number, j: number) {
    // skip if game has ended
    if (Boolean(currentState.winner)) return;

    let nextMap: Map = [
      [...currentState.map[0]],
      [...currentState.map[1]],
      [...currentState.map[2]],
    ];
    nextMap[i][j] = mark;

    const nextTurn: CellMark =
      currentState.turn == "cross" ? "nought" : "cross";

    const nextState: History = {
      map: nextMap,
      turn: nextTurn,
      winner: "",
    };

    // check for win
    const flattenedMap = nextMap.flat();
    for (const scenario of winScenarios)
      if (scenario.every((cell) => flattenedMap[cell] === currentState.turn))
        nextState.winner = currentState.turn;

    setHistory((prevHistory) =>
      prevHistory.slice(0, prevHistory.indexOf(currentState) + 1)
    );
    setHistory((prevHistory) => prevHistory.concat(nextState));

    setCurrentState(nextState);
    historyPlotter(history);
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

function historyPlotter(history: History[]) {
  let str = "";

  const maps = history.map((entry) => entry.map);
  maps.forEach((map) => {
    str += `\n ${map[0][0]} | ${map[0][1]} | ${map[0][2]}`;
    str += `\n ------`;
    str += `\n ${map[1][0]} | ${map[1][1]} | ${map[1][2]}`;
    str += `\n ------`;
    str += `\n ${map[2][0]} | ${map[2][1]} | ${map[2][2]}`;
    str += `\n `;
  });

  console.log(str);
}

export default App;
