import { configureStore } from "@reduxjs/toolkit";
import gameplayReducer from "../components/gameplay/GameplaySlice"
import loginReducer from "../components/sidebar/panels/login/LoginSlice"

export const store = configureStore({
    reducer: {
        gameplay: gameplayReducer,
        login: loginReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch