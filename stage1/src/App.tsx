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
  const [isCorrect, setIsCorrect] = useState(false);
  const [fade, setFade] = useState(false);
  const [target, setTarget] = useState(false);
  const [statusCorrect, setStatusCorrect] = useState(false);
  const [statusWrong, setStatusWrong] = useState(false);

  const newGame = () => {
    const colors = getRandomColors();
    setTargetColor(colors[Math.floor(Math.random() * colors.length)]);
    setColorOption(colors);
    setIsClicked(false);
    setScore(0);
    setIsWrong(false);
    setGameOver(false);
    setStatusCorrect(false);
    setIsCorrect(false);
    setStatusWrong(false);
  };

  const continueGame = () => {
    const colors = getRandomColors();
    setTargetColor(colors[Math.floor(Math.random() * colors.length)]);
    setColorOption(colors);
    setTarget(true);
    setFade(true);
  };

  const handleGuess = (color: string) => {
    if (color === targetColor) {
      setScore((prevScore) => prevScore + 1);
      setIsClicked(true);
      setStatusCorrect(true);
      setIsCorrect(true);
      setStatusWrong(false);
      continueGame();
    } else {
      setIsClicked(true);
      setIsWrong(true);
      setStatusCorrect(false);
      setStatusWrong(true);
      setGameOver(true);
    }

    setTimeout(() => {
      setTarget(false);
      setIsCorrect(false);
      setIsWrong(false);
      setIsClicked(false);
      setStatusCorrect(false);
      setStatusWrong(false);
      setFade(false);
    }, 1500);
  };

  useEffect(() => {
    newGame();
  }, []);

  return (
    <section
      id="gameContainer"
      className={isCorrect ? "correct" : isWrong ? "wrong" : ""}
    >
      <div className="gameArea">
        <h1>Color Guessing Game</h1>
        <div
          data-testid="colorBox"
          className={`target-color ${target ? "next-target" : ""}`}
          id="target"
          style={{ backgroundColor: targetColor }}
        ></div>
        <div className="gameInfo">
          <p data-testid="score" className="score">
            Score: {score}
          </p>
          <p
            data-testid="gameStatus"
            className={`game-status ${
              statusCorrect
                ? "status-correct"
                : statusWrong
                ? "status-wrong"
                : ""
            }`}
            id="status"
          >
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
        <p className="instructions" data-testid="gameInstructions">
          Match the color in the box above! <br />
          Click on the button that matches the target color. <br />
          Keep your streak going to score higher!
        </p>
        <div className={`options ${fade ? "fade" : ""}`}>
          {colorOption.map((color) => (
            <button
              id="button"
              data-testid="colorOption"
              aria-label={`select color ${color}`}
              key={color}
              className="color-option"
              style={{ backgroundColor: color }}
              onClick={() => handleGuess(color)}
            ></button>
          ))}
        </div>
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
            type="submit"
            data-testid="newGameButton"
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
