import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PieceType } from "./Piece"

interface PieceState {
    isPawnChosen: boolean
    chosenPiecePosition: string
    chosenPieceType: PieceType | undefined
    availableMoves: string[]
}

const initialState: PieceState = {
    isPawnChosen: false,
    chosenPiecePosition: "",
    chosenPieceType: undefined,
    availableMoves: []
}

export const pieceSlice = createSlice({
    name: 'piece',
    initialState,
    reducers: {
        CHOOSE_PIECE: (state, action: PayloadAction<{ 
            piecePosition: string,
            pieceType: PieceType,
        }>) => {
            state.isPawnChosen = true
            state.chosenPiecePosition = action.payload.piecePosition
            state.chosenPieceType = action.payload.pieceType
        },
        GET_MOVES: (state, action: PayloadAction<{ 
            availableMoves: string[]
        }>) => {
            state.availableMoves = action.payload.availableMoves
        },
        CLEAR: (state) => {
            state.isPawnChosen = false
            state.chosenPiecePosition = ""
            state.availableMoves = []
        }
    }
});

export const { CHOOSE_PIECE, GET_MOVES, CLEAR } = pieceSlice.actions;
export default pieceSlice.reducer;