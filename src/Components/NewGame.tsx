import {Sprite, Text, useApp} from "@pixi/react"
import PlayAgainBtn from "../assets/play_button.png"
import PlayBtn from "../assets/start-new-game-button.png"
import {textStyle} from "./textStyle"
import {observer} from "mobx-react-lite";
import {useStores} from "../store";

type NewGameProps = {
    handleResetGame: () => void
}
export const NewGame = observer(({ handleResetGame }: NewGameProps) => {
    const app = useApp()
    const { gameStore } = useStores()

    const { score, isNewGame, setIsNewGame } = gameStore
    const newBestScore = localStorage.getItem('bestScore') ?? '0'

    const handleStartAgain = () => {
        handleResetGame()
    }

    const handleStartNewGame= () => {
        handleResetGame()
        setIsNewGame(false)
    }

    return (
        <Sprite
            image="https://pixijs.com/assets/bg_button.jpg"
            width={app.screen.width}
            height={app.screen.height}
        >
            {isNewGame ? (
                <Sprite
                    eventMode='static'
                    image={PlayBtn}
                    x={app.screen.width/2}
                    y={app.screen.height/2 + 50}
                    width={250}
                    height={50}
                    anchor={0.5}
                    pointerdown={handleStartNewGame}
                    cursor='pointer'
                />
            ) : (
                <>
                    <Text
                        text={`Best score: ${newBestScore}`}
                        x={app.screen.width/2}
                        y={app.screen.height/2 - 50}
                        anchor={0.5}
                        style={textStyle}
                    />
                    <Text
                        text={`Your score: ${score}`}
                        x={app.screen.width/2}
                        y={app.screen.height/2}
                        anchor={0.5}
                        style={textStyle}
                    />
                    <Sprite
                        eventMode='static'
                        image={PlayAgainBtn}
                        x={app.screen.width/2}
                        y={app.screen.height/2 + 50}
                        width={50}
                        height={50}
                        anchor={0.5}
                        pointerdown={handleStartAgain}
                        cursor='pointer'
                    />
                </>
            )}
        </Sprite>
    )
})
