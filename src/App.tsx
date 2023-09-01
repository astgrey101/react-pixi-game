import {Game} from "./Components/Game";
import {Stage, Text} from "@pixi/react";
import {useState} from "react";
import {NewGame} from "./Components/NewGame";
import {textStyle} from "./Components/textStyle";

function App() {
  const [score, setScore] = useState(0)
  const [isEndGame, setIsEndGame] = useState(true)
  const [isNewGame, setIsNewGame] = useState(true);
  const handleResetGame = () => {
    setIsEndGame(false)
    setScore(0)
  }
  return (
    <Stage width={640} height={360} options={{ background: '#1099bb' }}>
      {isEndGame ? (
        <NewGame score={score} handleResetGame={handleResetGame} setIsNewGame={setIsNewGame} isNewGame={isNewGame} />
      ) : (
        <>
          <Text
            text={`Score: ${score}`}
            x={5}
            y={5}
            style={textStyle}
          />
          <Game score={score} setScore={setScore} setIsEndGame={setIsEndGame} />
        </>
      )}
    </Stage>
  );
}

export default App;
