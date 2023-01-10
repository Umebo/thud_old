import { configureStore } from "@reduxjs/toolkit";
import gameplayReducer from "../components/gameplay/GameplaySlice"
import loginReducer from "../components/sidebar/panels/login/LoginSlice"
import pieceReducer from "../components/board/pieces/PieceSlice"

export const store = configureStore({
    reducer: {
        gameplay: gameplayReducer,
        piece: pieceReducer,
        login: loginReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch