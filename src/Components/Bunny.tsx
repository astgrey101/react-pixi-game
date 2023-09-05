import {Sprite, useApp, useTick} from "@pixi/react";
import {useCallback, useRef, useState} from "react"
import BunnyImage from "../assets/bunny1.webp"
import {observer} from "mobx-react-lite";
import {useStores} from "../store";

const anchor = { x: 0.5, y: 1 }

type BunnyProps = {
    xvalue: number
}
export const Bunny = observer(({ xvalue }: BunnyProps) => {
    const app = useApp()
    const { gameStore } = useStores()
    const iter = useRef(0);
    const [x, setX] = useState(xvalue)
    const [motion, setMotion] = useState({ y: 0, x: xvalue })
    const [isVisible, setIsVisible] = useState(true)
    
    const { setScore, score, setIsEndGame } = gameStore

    useTick((delta) => {
        let i = (iter.current += (1 + score/100) * delta);
        if (i >= app.screen.height) {
            setIsEndGame(true)
            app.renderer.events.cursorStyles.default = 'default, auto'
        }
        if (!isVisible) {
            iter.current = 0
            i = iter.current
            setX(Math.random()*(app.screen.width - 100) + 50)
            setIsVisible(true)
        }
        setMotion({ y: i, x })
    });

    const handlePointerover = useCallback(() => {
        setIsVisible(false)
        setScore(score + 1)
    }, [score, setScore])

    return (
        <Sprite
            {...motion}
            eventMode='static'
            image={BunnyImage}
            anchor={anchor}
            width={70}
            height={70}
            pointerover={handlePointerover}
        />
    );
})
