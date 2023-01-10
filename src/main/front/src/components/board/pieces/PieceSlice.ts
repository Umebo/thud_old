import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Piece, PieceType } from "./Piece"

interface PieceState {
    isPawnChosen: boolean
    chosenPiecePosition: string
    isMoveDone: boolean
}

const initialState: PieceState = {
    isPawnChosen: false,
    chosenPiecePosition: "",
    isMoveDone: false,
}

export const pieceSlice = createSlice({
    name: 'piece',
    initialState,
    reducers: {
        CHOOSE_PIECE: (state, action: PayloadAction<{ 
            piecePosition: string 
        }>) => {
            state.isPawnChosen = true
            state.chosenPiecePosition = action.payload.piecePosition
        },
        MOVE_DONE: (state) => {
            state.isMoveDone = true
        },
        CLEAR: (state) => {
            state.isPawnChosen = false
            state.chosenPiecePosition = ""
        }
    }
});

export const { CHOOSE_PIECE, CLEAR } = pieceSlice.actions;
export default pieceSlice.reducer;