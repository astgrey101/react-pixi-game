import {useApp} from "@pixi/react"
import '@pixi/events'
import {Dispatch, SetStateAction, useEffect, useMemo, useState} from "react"
import {Bunny} from "./Bunny"

type GameProps = {
    score: number
    setScore: Dispatch<SetStateAction<number>>
    setIsEndGame: (value: boolean) => void
}
export const Game = ({ score, setScore, setIsEndGame }: GameProps) => {
    const app = useApp()
    const [bunnies, setBunnies] = useState(1)
    app.renderer.events.cursorStyles.default = 'url(\'https://pixijs.com/assets/bunny.png\'),auto'

    useEffect(() => {
        if (score && score % 10 === 0) {
            setBunnies(prev => prev + 1)
        }
        const bestScore = localStorage.getItem('bestScore') ?? '0'
        if (score > parseInt(bestScore)) {
            localStorage.setItem('bestScore', score.toString())
        }
    }, [score])

    const renderBunnies = useMemo(() => {
        let res = []
        for(let idx = 0; idx < bunnies; idx++) {
            res.push((
              <Bunny
                key={idx}
                xvalue={Math.random()*(app.screen.width - 100) + 50}
                setScore={setScore}
                setIsEndGame={setIsEndGame}
                score={score}
              />
            ))
        }
        return res
    }, [app.screen.width, bunnies, score, setIsEndGame, setScore])

    return (
        <>
            {renderBunnies}
        </>
    )
}
