import {Game} from "./Components/Game";
import {Stage, Text} from "@pixi/react";
import {NewGame} from "./Components/NewGame";
import {textStyle} from "./Components/textStyle";
import {observer} from "mobx-react-lite";
import {useStores} from "./store";

const App = observer(() => {
  const { gameStore } = useStores()
  const { setIsEndGame, setScore, score, isEndGame } = gameStore
  const handleResetGame = () => {
    setIsEndGame(false)
    setScore(0)
  }
  return (
    <Stage width={640} height={360} options={{ background: '#1099bb' }}>
      {isEndGame ? (
        <NewGame handleResetGame={handleResetGame} />
      ) : (
        <>
          <Text
            text={`Score: ${score}`}
            x={5}
            y={5}
            style={textStyle}
          />
          <Game />
        </>
      )}
    </Stage>
  );
})

export default App;
