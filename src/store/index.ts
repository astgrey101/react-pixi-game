import {createContext, useContext} from "react";
import {GameStore} from "./GameStore";

export const rootStoreContext = createContext({
  gameStore: new GameStore()
});

export const useStores = () => useContext(rootStoreContext);
