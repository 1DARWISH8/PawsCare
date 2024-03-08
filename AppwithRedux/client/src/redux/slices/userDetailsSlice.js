import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// Use createAsyncThunk middleware 
export const userDetailsPromiseStatus = createAsyncThunk(
    'user-details',
    async(data,thunkAPI)=>
    {
        try
        {
            console.log(data)
            let res = await axios.post('http://localhost:5000/user-api/getuser',data)
            console.log(res)
        }
        catch(err)
        {
            return thunkAPI.rejectWithValue(err)
        }
    })


const userDetailsSlice = createSlice(
    {
        name:'user-details',
        initialState:
        {
            presentUser:{},
            errorMessage:'',
            isPending:false
        },
        reducers:{},
        extraReducers:builder=>
        builder.addCase(userDetailsPromiseStatus.pending,(state,action)=>
        {
            state.isPending=true;
        })
        .addCase(userDetailsPromiseStatus.fulfilled,(state,action)=>
        {
            state.presentUser=action.payload;
            console.log(state.presentUser)
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

// export actions
export const {} = userDetailsSlice.actions;
// export root reducer
export default userDetailsSlice.reducer;
