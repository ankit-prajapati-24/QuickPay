import { createSlice } from "@reduxjs/toolkit";

const getStoredUserData = () => {
    try {
        const data = localStorage.getItem("userdata");
        return data ? JSON.parse(data) : "";
    } catch (error) {
        console.error("Error parsing userdata from localStorage:", error);
        return "";
    }
};

const initialState = {
    userdata: getStoredUserData(),
    SignData: "",
    isLogin: false,
    role: localStorage.getItem("role") || "",
    token: localStorage.getItem("token") || "",
};

const userDataSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setuserdata(state, action) {
            try {
                const jsonData = JSON.stringify(action.payload);
                localStorage.setItem("userdata", jsonData);
                state.userdata = action.payload;
            } catch (error) {
                console.error("Error storing userdata in localStorage:", error);
            }
        },
        setSignData(state, action) {
            state.SignData = action.payload;
        },
        setToken(state, action) {
            localStorage.setItem("token", action.payload);
            state.token = action.payload;
        },
        setRole(state, action) {
            localStorage.setItem("role", action.payload);
            state.role = action.payload;
        },
    },
});

export const { setuserdata, setRole, setSignData, setToken } = userDataSlice.actions;
export default userDataSlice.reducer;
