import {createSlice,createAsyncThunk, isPending} from '@reduxjs/toolkit'
import axios from 'axios'

// createAsynThunk middleware
export const userselectedDetailsPromiseSlice = createAsyncThunk(
    'selected-user-details',
    async(user,thunkAPI)=>
    {
        try
        {
            let res = await axios.post('http://localhost:5000/user-api/getuser',user)
            if (res.data.message !== 'USER')
            {
                return thunkAPI.rejectWithValue(res.data)
            }
            return res.data
        }
        catch(err)
        {
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const userselectedDetailsSlice = createSlice(
    {
        name:'user-details',
        initialState:
        {
            selectedUser:{},
            errorMessage:'',
            isPending:false
        },
        reducers:
        {
            userreFresh:(state)=>
            {
                state.selectedUser={};
                state.errorMessage='';
                state.isPending=false;
            }
        },
        extraReducers:builder=>
        builder.addCase(userselectedDetailsPromiseSlice.pending,(state,action)=>
        {
            state.isPending=true;
        })
        .addCase(userselectedDetailsPromiseSlice.fulfilled,(state,action)=>
        {
            state.selectedUser=action.payload.payload;
            state.errorMessage='';
            state.isPending=false;
        })
        .addCase(userselectedDetailsPromiseSlice.rejected,(state,action)=>
        {
            state.selectedUser={};
            state.errorMessage=action.payload;
            state.isPending=false;
        })
    }
)

export const {userreFresh} = userselectedDetailsSlice.actions;

export default userselectedDetailsSlice.reducer
