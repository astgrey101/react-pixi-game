import {Game} from "./Components/Game";
import {Stage} from "@pixi/react";
import {NewGame} from "./Components/NewGame";
import {observer} from "mobx-react-lite";
import {useStores} from "./store";

const App = observer(() => {
  const { gameStore } = useStores()
  const { setIsEndGame, setScore, isEndGame } = gameStore
  const handleResetGame = () => {
    setIsEndGame(false)
    setScore(0)
  }
  return (
    <Stage width={640} height={360} options={{ background: '#1099bb' }}>
      {isEndGame ? (
        <NewGame handleResetGame={handleResetGame} />
      ) : (
        <Game />
      )}
    </Stage>
  );
})

export default App;
