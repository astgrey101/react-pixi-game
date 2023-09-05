import {makeAutoObservable} from "mobx";

export class GameStore {
  score = 0
  isEndGame = true
  isNewGame = true

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setScore(score: number) {
    this.score = score
  }

  setIsEndGame(isEndGame: boolean) {
    this.isEndGame = isEndGame
  }

  setIsNewGame(isNewGame: boolean) {
    this.isNewGame = isNewGame
  }
}
