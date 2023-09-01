import {Sprite, useApp, useTick} from "@pixi/react";
import {Dispatch, SetStateAction, useCallback, useRef, useState} from "react"
import BunnyImage from "../assets/bunny1.webp"

const anchor = { x: 0.5, y: 1 }

type BunnyProps = {
    xvalue: number
    score: number
    setIsEndGame: (value: boolean) => void
    setScore:  Dispatch<SetStateAction<number>>
}
export const Bunny = ({ xvalue, setScore, score, setIsEndGame }: BunnyProps) => {
    const app = useApp()
    const iter = useRef(0);
    const [x, setX] = useState(xvalue)
    const [motion, setMotion] = useState({ y: 0, x: xvalue })
    const [isVisible, setIsVisible] = useState(true)

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
        setScore((prev) => prev + 1)
    }, [setScore])

    return (
        <Sprite
            {...motion}
            interactive={true}
            image={BunnyImage}
            anchor={anchor}
            width={70}
            height={70}
            pointerover={handlePointerover}
        />
    );
};