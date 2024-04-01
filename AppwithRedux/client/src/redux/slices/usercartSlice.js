import {createSlice, CreateAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'



const usercartSlice = createSlice(
    {
        name:'userCart',
        initialState:{},
        reducers:{},
        extraReducers:{}
    }
)


// export actions
export const {} = usercartSlice.actions;
// export root reducer
export default usercartSlice.reducer;
