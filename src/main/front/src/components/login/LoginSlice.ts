import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface LoginState {
    nickname: string
    isLogged: boolean
}

const initialState: LoginState = {
    nickname: "",
    isLogged: false
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        LOGIN: (state, action: PayloadAction<{
            nickname: string
        }>) => {
            state.nickname = action.payload.nickname
            state.isLogged = true
        }
    }
});

export const { LOGIN } = loginSlice.actions;

export default loginSlice.reducer;