import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface GameplayState {
    uuid: string,
    status: string,
    player1: string,
    player2?: string,
}

const initialState: GameplayState = {
    uuid: "",
    status: "",
    player1: "",
    player2: undefined
}

export const gameplaySlice = createSlice({
    name: 'gameplay',
    initialState,
    reducers: {
        CREATE: (state, action: PayloadAction<{ 
            uuid: string, 
            status: string,
            player1: string 
        }>) => {
            state.uuid = action.payload.uuid
            state.status = action.payload.status
            state.player1 = action.payload.player1
        },
        JOIN: (state, action: PayloadAction<{ 
            uuid: string, 
            status: string,
            player1: string,
            player2: string 
        }>) => {
            state.uuid = action.payload.uuid
            state.status = action.payload.status
            state.player1 = action.payload.player1
            state.player2 = action.payload.player2
        }
    }
});

export const { CREATE, JOIN } = gameplaySlice.actions;

// export const selectGameplayUUID = (state: RootState) => state.gameplay.uuid

export default gameplaySlice.reducer;