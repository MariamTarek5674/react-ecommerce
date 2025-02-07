
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import {jwtDecode} from "jwt-decode";

export const login = createAsyncThunk("auth/login", async (credentials) => {
        const response = await axios.post("https://fakestoreapi.com/auth/login", {
            username: credentials.userName,
            password: credentials.password,
        });        
        return response.data;
});

export const getUser = createAsyncThunk('auth/getUser',async ()=>{
    const id = localStorage.getItem('userId')
    let user= await axios.get(`https://fakestoreapi.com/users/${id}`)
    return user.data
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthanticated: !!localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user')) || {}
    },
    reducers: {
        logout(state) {
            localStorage.clear()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("token", action.payload.token);
            const {sub} = jwtDecode(action.payload.token); //extract userId from token cause it is not returned in the login response
            localStorage.setItem("userId", sub);
            state.isAuthanticated=true
            toast.success("Login successfully!");
        })
        builder.addCase(login.rejected, (state, action) => {            
            toast.error(action.error.message);
        })

        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user',JSON.stringify(action.payload))
        })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer; 