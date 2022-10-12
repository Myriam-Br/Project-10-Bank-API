import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./UserSlice"
import authReducer from "./AuthSlice"

export default configureStore({
    reducer:{
        auth: authReducer,
        user : userReducer,
    }
})