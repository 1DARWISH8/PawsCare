import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// Use createAsyncThunk middleware 
export const productDetailsPromiseStatus = createAsyncThunk(
    'product-details',
    async(item,thunkAPI)=>
    {
        try
        {
            // console.log(item)
            let res = await axios.post('http://localhost:5000/admin-api/getaproduct',item)
            // console.log(res)
            if (res.data.message!=='Product')
            {
                return thunkAPI.rejectWithValue(res.data);
            }
            return res.data
        }
        catch(err)
        {
            return thunkAPI.rejectWithValue(err)
        }
    })


const productDetailsSlice = createSlice(
    {
        name:'product-details',
        initialState:
        {
            presentItem:{},
            productSelected:false,
            errorMessage:'',
            isPending:false
        },
        reducers:
        {
            reFresh:(state)=>
            {
                state.presentItem={};
                state.productSelected=false;
                state.errorMessage='';
                state.isPending=false;
            }
        },
        extraReducers:builder=>
        builder.addCase(productDetailsPromiseStatus.pending,(state,action)=>
        {
            state.isPending=true;
        })
        .addCase(productDetailsPromiseStatus.fulfilled,(state,action)=>
        {
            state.presentItem=action.payload.product;
            // console.log(state.presentItem)
            state.productSelected=true;
            state.errorMessage='';
            state.isPending=false;
        })
        .addCase(productDetailsPromiseStatus.rejected,(state,action)=>
        {
            state.presentItem={};
            state.productSelected=false;
            state.errorMessage=action.payload;
            state.isPending=false;
        })
    }
)

// export actions
export const {reFresh} = productDetailsSlice.actions;
// export root reducer
export default productDetailsSlice.reducer;
