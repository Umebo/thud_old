import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface GameplayState {
    uuid: string,
    status: string,
    dwarfPlayer: string,
    trollPlayer?: string,
}

const initialState: GameplayState = {
    uuid: "",
    status: "",
    dwarfPlayer: "",
    trollPlayer: undefined
}

export const gameplaySlice = createSlice({
    name: 'gameplay',
    initialState,
    reducers: {
        CREATE: (state, action: PayloadAction<{ 
            uuid: string, 
            status: string,
            nickname: string 
        }>) => {
            state.uuid = action.payload.uuid
            state.status = action.payload.status
            state.dwarfPlayer = action.payload.nickname
        },
        JOIN: (state, action: PayloadAction<{ 
            uuid: string, 
            status: string,
            firstPlayer: string,
            secondPlayer: string 
        }>) => {
            state.uuid = action.payload.uuid
            state.status = action.payload.status
            state.dwarfPlayer = action.payload.firstPlayer
            state.trollPlayer = action.payload.secondPlayer
        }
    }
});

export default gameplaySlice.reducer;

// Actions

export const { CREATE, JOIN } = gameplaySlice.actions;

//TODO: move axios actions here

//e.g.
// export const whatever = () => {

// }