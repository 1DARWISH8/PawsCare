import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

// Use createAsyncThunk middleware

export const petProductsPromiseStatus = createAsyncThunk(
    'pet-products',
    async(pet,thunkAPI)=>
    {
        try
        {
            let products = await axios.get(`http://localhost:5000/user-api/getpetproducts/${pet}`)
            if (products.data.message==="RETRIEVED PET PRODUCTS")
            {
                return products.data
            }
            else
            {
                return thunkAPI.rejectWithValue(products.data)
            }
        }
        catch(err)
        {
            return thunkAPI.rejectWithValue(err)
        }
    })

const petProductsSlice = createSlice(
    {
        name:'pet-products',
        initialState:
        {
            petproducts:{},
            productSelected:false,
            errorMessage:'',
            isPending:false
        },
        reducers:
        {},
        extraReducers:builder=>
        builder.addCase(petProductsPromiseStatus.pending,(state,action)=>
        {
            state.isPending=true;
        })
        .addCase(petProductsPromiseStatus.fulfilled,(state,action)=>
        {
            state.petproducts=action.payload.payload;
            state.productSelected=true;
            state.errorMessage='';
            state.isPending=false;
        })
        .addCase(petProductsPromiseStatus.rejected,(state,action)=>
        {
            state.petproducts={};
            state.productSelected=false;
            state.errorMessage=action.payload.message;
            state.isPending=false;
        })
    }
)

// export actions
export const {} = petProductsSlice.actions;
// export root reducer
export default petProductsSlice.reducer
