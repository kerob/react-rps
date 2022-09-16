import ScissorsImg from "../img/icon-scissors.svg";
import RockImg from "../img/icon-rock.svg";
import PaperImg from "../img/icon-paper.svg";
import { useState } from "react";

function MoveSelect({ selectMove }) {
  return (
    <div className="game-move-select">
      <div className="game-row flex">
        <div className="game-icon flex paper-bg">
          <img src={PaperImg} alt="" onClick={() => selectMove("paper")} />
        </div>
        <div className="game-icon flex scissors-bg">
          <img
            src={ScissorsImg}
            alt=""
            onClick={() => selectMove("scissors")}
          />
        </div>
      </div>
      <div className="game-row flex">
        <div className="game-icon flex rock-bg">
          <img src={RockImg} alt="" onClick={() => selectMove("rock")} />
        </div>
      </div>
    </div>
  );
}

function ActiveMatch({
  resetGame,
  player,
  opponent,
  playComputer,
  gameStatus,
}) {
  const fetchImg = (value) => {
    switch (value) {
      case "scissors":
        return ScissorsImg;
      case "rock":
        return RockImg;
      case "paper":
        return PaperImg;
    }
  };
  return (
    <div className="game-match grid">
      <div className="game-card flex" data-owner="player">
        <h2 className="uppercase txt-light">You Picked</h2>
        <div className={`game-icon flex ${player}-bg`} data-type="selected">
          <img src={fetchImg(player)} alt="" />
        </div>
      </div>
      <div className="game-prompt">
        {opponent === "" ? (
          <>
            <h2 className="uppercase txt-light fs-700">Set Move</h2>
            <div className="prompt-btns">
              <button className="btn uppercase" onClick={() => resetGame()}>
                Cancel
              </button>
              <button className="btn uppercase" onClick={() => playComputer()}>
                Confirm
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="uppercase txt-light fs-700">You {gameStatus}</h2>
            <div>
              <button className="btn uppercase" onClick={() => resetGame()}>
                Play Again
              </button>
            </div>
          </>
        )}
      </div>

      <div className="game-card flex" data-owner="opponent">
        <h2 className="uppercase txt-light">The House Picked</h2>
        {opponent === "" ? (
          <div className={`game-icon empty-bg`} data-type="selected"></div>
        ) : (
          <div className={`game-icon flex ${opponent}-bg`} data-type="selected">
            <img src={fetchImg(opponent)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function GameWindow({ updateScore }) {
  const [player, setPlayer] = useState("");
  const [computer, setComputer] = useState("");
  const [gameStatus, setGameStatus] = useState("");

  const selectMove = (value) => {
    setPlayer(value);
  };

  const compareMoves = (opponent) => {
    if (player === opponent) {
      setGameStatus("draw");
    } else if (player === "scissors" && opponent === "paper") {
      setGameStatus("win");
      updateScore();
    } else if (player === "paper" && opponent === "rock") {
      setGameStatus("win");
      updateScore();
    } else if (player === "rock" && opponent === "scissors") {
      setGameStatus("win");
      updateScore();
    } else {
      setGameStatus("lose");
    }
  };

  const playComputer = () => {
    let num = Math.floor(Math.random() * 3);
    let move = "";
    switch (num) {
      case 0:
        setComputer("scissors");
        move = "scissors";
        break;
      case 1:
        setComputer("rock");
        move = "rock";
        break;
      case 2:
        setComputer("paper");
        move = "paper";
        break;
    }
    compareMoves(move);
  };

  const resetGame = () => {
    setPlayer("");
    setComputer("");
    setGameStatus("");
  };

  return (
    <div className="game-window">
      {player === "" ? (
        <MoveSelect selectMove={selectMove} />
      ) : (
        <ActiveMatch
          player={player}
          opponent={computer}
          resetGame={resetGame}
          playComputer={playComputer}
          gameStatus={gameStatus}
        />
      )}
    </div>
  );
}
