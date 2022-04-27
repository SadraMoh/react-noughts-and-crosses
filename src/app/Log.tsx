import { History } from "./model/Game";

type LogProps = {
  history: History[];
  entrySelected: (entry: History) => void;
};

function Log({ history, entrySelected }: LogProps) {
  function entryClicked(entry: History) {
    entrySelected(entry);
  }

  return (
    <div className="col" style={{ marginBottom: "auto" }}>
      {history.map((entry, i) => (
        <button key={i} onClick={() => entryClicked(entry)}>state {i}</button>
      ))}
    </div>
  );
}

export default Log;
