import {createSlice} from "@reduxjs/toolkit"

const initialState = {value: {token : null, status : null, message : null}}

export const authSlice = createSlice({
    name:"auth",
    initialState : initialState,
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
        logout : (state, action) => {
            state.value = initialState
        }
    }
})

export const {login, logout} = authSlice.actions
export default authSlice.reducer