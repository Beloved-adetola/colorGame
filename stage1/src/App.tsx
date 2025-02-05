import { useEffect, useState } from "react";
import "./App.css";

//Get colors and reshuffle them
const COLORS = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "black",
  "white",
  "gray",
  "cyan",
];

const getRandomColors = () => {
  const shuffledColors = [...COLORS].sort(() => 0.5 - Math.random());
  return shuffledColors.slice(0, 6);
};

function App() {
  const [targetColor, setTargetColor] = useState("");
  const [colorOption, setColorOption] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    newGame();
  }, []);

  const stat = document.getElementById("gameContainer");
  const fade = document.getElementById("optionBox");
  const target = document.getElementById("target");
  const status = document.getElementById("status");

  const newGame = () => {
    const colors = getRandomColors();
    setTargetColor(colors[Math.floor(Math.random() * colors.length)]);
    setColorOption(colors);
    setIsClicked(false);
    setScore(0);
    setIsWrong(false);
    stat?.classList.remove("correct", "wrong");
    setGameOver(false);
    status?.classList.remove("status-wrong", "status-correct");
  };

  const continueGame = () => {
    const colors = getRandomColors();
    setTargetColor(colors[Math.floor(Math.random() * colors.length)]);
    setColorOption(colors);
    setIsClicked(false);
    stat?.classList.remove("correct");
    stat?.classList.remove("wrong");
    setIsWrong(false);
    target?.classList.add("next-target");
    fade?.classList.add("fade");
    status?.classList.remove("status-wrong", "status-correct");
  };

  const handleGuess = (color: string) => {
    if (color === targetColor) {
      setScore((prevScore) => prevScore + 1);
      setIsClicked(true);
      stat?.classList.add("correct");
      target?.classList.remove("next-target");
      fade?.classList.remove("fade");
      status?.classList.add("status-correct");
    } else {
      setIsClicked(true);
      target?.classList.remove("next-target");
      stat?.classList.add("wrong");
      setIsWrong(true);
      fade?.classList.remove("fade");
      status?.classList.add("status-wrong");
      setGameOver(true);
    }
  };

  return (
    <section id="gameContainer">
      <div className="gameArea">
        <div
          data-testid="colorBox"
          className="target-color"
          id="target"
          style={{ backgroundColor: targetColor }}
        ></div>
        <div className="gameInfo">
          <p data-testid="" className="score">
            Score: {score}
          </p>
          <p data-testid="" className="game-status" id="status">
            {isClicked ? (
              isWrong ? (
                <span>
                  You are Wrong <i className="bx bx-x-circle bx-sm"></i>
                </span>
              ) : (
                <span>
                  You are Correct <i className="bx bx-check-circle bx-sm"></i>
                </span>
              )
            ) : (
              <span></span>
            )}
          </p>
        </div>
        <p data-testid="gameInstructions">Guess the Color?</p>
        <div className="options">
          {colorOption.map((color) => (
            <button
              id="button"
              data-testid=""
              key={color}
              disabled={isClicked === true}
              className="color-option"
              style={{ backgroundColor: color }}
              onClick={() => handleGuess(color)}
            ></button>
          ))}
        </div>
        <button
          disabled={gameOver === true || isClicked === false}
          onClick={continueGame}
        >
          Next Round
        </button>
      </div>

      {gameOver && (
        <div className="resultBox">
          {score >= 10 ? (
            <i className="bx bxs-badge-check bx-lg"></i>
          ) : (
            <i className="bx bxs-message-square-x bx-lg"></i>
          )}
          <h2>You Lose, Try again</h2>
          <p>Your Score: {score}</p>
          <button
            data-testid="restartGameButton"
            onClick={newGame}
            className="restart-game-button"
          >
            Restart Game
          </button>
        </div>
      )}
    </section>
  );
}

export default App;

{
  /* <i class='bx bx-check-circle' ></i> */
}
//<i class='bx bxs-badge-check' ></i>
//<i class='bx bxs-message-square-x'></i>
