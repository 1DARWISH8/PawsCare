import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'

export const userCartPromiseStatus = createAsyncThunk(
    'user-cart',
    async(user,thunkAPI)=>
    {
        try
        {
            let result = await axios.get(`http://localhost:5000/user-api/cart/${user}`)
            if (result.data.message==="RETRIEVED USER-CART")
            {
                return result.data
            }
            else
            {
                return thunkAPI.rejectWithValue(result.data)
            }
        }
        catch(err)
        {
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const userCartSlice = createSlice(
    {
        name:'usercart',
        initialState:
        {
            userCart:{},
            errorMessage:'',
            isPending:false
        },
        reducers:
        {},
        extraReducers:builder=>
        builder.addCase(userCartPromiseStatus.pending,(state,action)=>
        {
            state.isPending=true;
        })
        .addCase(userCartPromiseStatus.fulfilled,(state,action)=>
        {
            state.userCart=action.payload.payload;
            state.errorMessage='';
            state.isPending=false;
        })
        .addCase(userCartPromiseStatus.rejected,(state,action)=>
        {
            state.userCart='';
            state.errorMessage=action.payload.message;
            state.isPending=false;
        })
    }
)

// export actions
export const {} = userCartSlice.actions;
// export root reducer
export default userCartSlice.reducer
