import {Text, useApp} from "@pixi/react"
import '@pixi/events'
import {useEffect, useMemo, useState} from "react"
import {Bunny} from "./Bunny"
import {observer} from "mobx-react-lite";
import {useStores} from "../store";
import {textStyle} from "./textStyle";

export const Game = observer(() => {
    const app = useApp()
    const { gameStore } = useStores()
    const [bunnies, setBunnies] = useState(1)
    const { score } = gameStore

    app.renderer.events.cursorStyles.default = 'url(\'https://pixijs.com/assets/bunny.png\')'

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
              />
            ))
        }
        return res
    }, [app.screen.width, bunnies])

    return (
        <>
            <Text
              text={`Score: ${score}`}
              x={5}
              y={5}
              style={textStyle}
            />
            {renderBunnies}
        </>
    )
})
