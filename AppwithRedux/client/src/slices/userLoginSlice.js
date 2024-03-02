import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// Create createAsyncThunk middleware to create a middleware
// that returns an object of promise lifecycle
export const userLoginPromiseStatus = createAsyncThunk(
    'user-login', //Type prefix
    async(data,thunkAPI)=>
    {
        try
        {
            let res = await axios.post('http://localhost:5000/user-api/login',data)
            // check if login was a success
            if(res.data.message==='SUCCESSFUL LOGIN')
            {
                // save token in session storage
                sessionStorage.setItem('token',res.data.token);
            }
            else
            {
                return thunkAPI.rejectWithValue(res.data);
            }
            return res.data;
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error)
        }
    }
    )


const userLoginSlice = createSlice(
    {
        name:'user-login-slice',
        initialState:
        {
            currentUser:[],
            loginStatus:false,
            errorMessage:'',
            isPending:false
        },
        reducers:
        {
            logOut:(state)=>
            {
                state.currentUser=[],
                state.loginStatus=false,
                state.errorMessage='',
                state.isPending=false
            }
        },
        extraReducers:builder=>
        builder.addCase(userLoginPromiseStatus.pending,(state,action)=>
        {
            state.isPending=true;
        })
        .addCase(userLoginPromiseStatus.fulfilled,(state,action)=>
        {
            state.currentUser=action.payload.user;
            state.loginStatus=true;
            state.errorMessage='';
            state.isPending=false;
        })
        .addCase(userLoginPromiseStatus.rejected,(state,action)=>
        {
            state.currentUser={};
            state.loginStatus=false;
            state.errorMessage=action.payload;
            state.isPending=false;
        })

    }
)

// export actions
export const {logOut} = userLoginSlice.actions;
// export root reducer
export default userLoginSlice.reducer;
