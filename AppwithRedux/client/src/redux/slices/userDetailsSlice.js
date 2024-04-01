import {createSlice,createAsyncThunk, isPending} from '@reduxjs/toolkit'
import axios from 'axios'

// createAsynThunk middleware
export const userDetailsPromiseStatus = createAsyncThunk(
    'user-details',
    async(data,thunkAPI)=>
    {
        try
        {
            let res = await axios.post('http://localhost:5000/user-api/getuser',data)
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

const userDetailsSlice = createSlice(
    {
        name:'user-details',
        initialState:
        {
            presentUser:{},
            errorMessage:'',
            isPending:false
        },
        reducers:
        {},
        extraReducers:builder=>
        builder.addCase(userDetailsPromiseStatus.pending,(state,action)=>
        {
            state.isPending=true;
        })
        .addCase(userDetailsPromiseStatus.fulfilled,(state,action)=>
        {
            state.presentUser=action.payload.payload;
            // console.log(state.presentUser)
            state.errorMessage='';
            state.isPending=false;
        })
        .addCase(userDetailsPromiseStatus.rejected,(state,action)=>
        {
            state.presentUser={};
            state.errorMessage=action.payload;
            state.isPending=false;
        })
    }
)

export const {} = userDetailsSlice.actions;

export default userDetailsSlice.reducer
