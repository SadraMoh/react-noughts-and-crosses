import { CellMark } from "./CellMark";

type History = {
  map: Map
  turn: CellMark
  winner: CellMark
}

type Map = [
  [CellMark, CellMark, CellMark],
  [CellMark, CellMark, CellMark],
  [CellMark, CellMark, CellMark]
];

const winScenarios: [number, number, number][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export { winScenarios };
export type { Map, History };
