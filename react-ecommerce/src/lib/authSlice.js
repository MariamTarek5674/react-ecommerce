
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const login = createAsyncThunk("auth/login", async (credentials) => {
        const response = await axios.post("https://fakestoreapi.com/auth/login", {
            username: credentials.userName,
            password: credentials.password,
        });        
        return response.data;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthanticated: !!localStorage.getItem('token'),
    },
    reducers: {
        logout(state) {
            localStorage.clear()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("token", action.payload.token);
            state.isAuthanticated=true
            toast.success("Login successfully!");
        })
        builder.addCase(login.rejected, (state, action) => {            
            toast.error(action.error.message);
        })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer; 