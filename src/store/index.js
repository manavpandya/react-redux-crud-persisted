import { createStore } from "redux";
import rootReducers from "../reducers";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState)

    } catch (error) {
        console.log(error)
        return undefined
    }
}

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)

    } catch (error) {
        console.log(error)
    }
}

const persistedState = loadState();

const store = createStore(rootReducers, persistedState);

store.subscribe(() => saveState(store.getState()));

export default store;
