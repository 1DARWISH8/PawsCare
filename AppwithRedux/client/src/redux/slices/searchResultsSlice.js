import { createSlice,createAsyncThunk, isPending } from "@reduxjs/toolkit";
import axios from 'axios'

// use createAsyncThunk middleware
export const searchResultsPromiseStatus = createAsyncThunk(
    'search-results',
    async(search_word,thunkAPI)=>
    {
        try
        {
            let products = await axios.get(`http://localhost:5000/user-api/getsearchresults/${search_word}`)
            if (products.data.message === "RETRIEVED SEARCH RESULTS")
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


    const searchResultsSlice = createSlice(
        {
            name:"search-results",
            initialState:
            {
                products:{},
                errorMessage:'',
                isPending:false
            },
            reducers:{},
            extraReducers:builder=>
            builder.addCase(searchResultsPromiseStatus.pending,(state,action)=>
            {
                state.isPending=true;
            })
            .addCase(searchResultsPromiseStatus.fulfilled,(state,action)=>
            {
                state.products=action.payload.payload;
                state.errorMessage='';
                state.isPending=false;
            })
            .addCase(searchResultsPromiseStatus.rejected,(state,action)=>
            {
                state.errorMessage=action.payload.message;
                state.products={};
                state.isPending=false;
            })
        }
    )

// export actions
export const {} = searchResultsSlice.actions;
// export root reducer
export default searchResultsSlice.reducer
