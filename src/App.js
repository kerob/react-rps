import { useEffect, useRef, useState } from "react";
import GameWindow from "./components/GameWindow";
import RulesGraphic from "./img/image-rules.svg";

function App() {
  const [score, setScore] = useState(0);
  const rulesRef = useRef();

  const updateScore = () => {
    setScore(score + 1);
  };

  return (
    <div className="App">
      <dialog ref={rulesRef} className="rules-dialog rounded" id="rules">
        <div className="rules-title flex">
          <h1 className="uppercase txt-dark">Rules</h1>
          <button
            className="rules-close-btn"
            data-display="desktop"
            type="reset"
            onClick={() => rulesRef.current.close()}
          >
            <span className="rules-close-1"></span>
            <span className="rules-close-2"></span>
          </button>
        </div>
        <img src={RulesGraphic} alt="graphic of the rules" />
        <div className="flex">
          <button
            className="rules-close-btn"
            type="reset"
            data-display="mobile"
            onClick={() => rulesRef.current.close()}
          >
            <span className="rules-close-1"></span>
            <span className="rules-close-2"></span>
          </button>
        </div>
      </dialog>
      <div className="content-container flex">
        <div className="score bg-clear txt-light rounded flex">
          <div className="score-gametype">
            <h2 className="uppercase">Rock</h2>
            <h2 className="uppercase">Paper</h2>
            <h2 className="uppercase">Scissors</h2>
          </div>
          <div className="score-counter grid rounded txt-dark">
            <h3 className="uppercase score-label">Score</h3>
            <h1>{score}</h1>
          </div>
        </div>
        <GameWindow updateScore={updateScore} />
        <div className="rules-container flex">
          <button
            className="rules-btn uppercase rounded bg-clear fs-400"
            onClick={() => rulesRef.current.showModal()}
          >
            Rules
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
