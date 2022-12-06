import { configureStore } from "@reduxjs/toolkit";
import gameplayReducer from "../components/gameplay/GameplaySlice"

export const store = configureStore({
    reducer: {
        gameplay: gameplayReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch