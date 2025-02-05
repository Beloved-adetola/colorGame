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
  };

  const continueGame = () => {
    const colors = getRandomColors();
    setTargetColor(colors[Math.floor(Math.random() * colors.length)]);
    setColorOption(colors);
    setIsClicked(false);
    setIsWrong(false);
    setTarget(true);
    setFade(true);
    setStatusCorrect(false);
    setIsCorrect(false);
  };

  const handleGuess = (color: string) => {
    if (color === targetColor) {
      setScore((prevScore) => prevScore + 1);
      setIsClicked(true);
      setTarget(false);
      setFade(false);
      setStatusCorrect(true);
      setIsCorrect(true);
    } else {
      setIsClicked(true);
      setTarget(false);
      setIsWrong(true);
      setFade(false);
      setStatusCorrect(false);
      setGameOver(true);
    }
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
              statusCorrect ? "status-correct" : "status-wrong"
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
        <p data-testid="gameInstructions">Guess the Color?</p>
        <div className={`options ${fade ? "fade" : ""}`}>
          {colorOption.map((color) => (
            <button
              id="button"
              data-testid="colorOption"
              aria-label={`select color ${color}`}
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

{
  /* <i class='bx bx-check-circle' ></i> */
}
//<i class='bx bxs-badge-check' ></i>
//<i class='bx bxs-message-square-x'></i>
