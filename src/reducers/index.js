import { combineReducers } from "@reduxjs/toolkit";
import User from '../slices/UserSlice'
const rootReducer = combineReducers({
    User:User
});

export default rootReducer;