


import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from './types';



const initialState: User = {
    username: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state: User, action: PayloadAction<User>) {
            state.username = "Hello";
        }
    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
