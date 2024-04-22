import {configureStore} from '@reduxjs/toolkit'
import userLoginSlice from './slices/userLoginSlice'
import productDetailsSlice from './slices/productDetailsSlice'
import userDetailsSlice from './slices/userDetailsSlice'
import userselectedDetailsSlice from './slices/userselectedDetailsSlice'
import petProductsSlice from './slices/petProductsSlice'
import userCartSlice from './userCartSlice'
import searchResultsSlice from './slices/searchResultsSlice'

export const store=configureStore(
    {
        reducer:
        {
            petProducts:petProductsSlice,
            userLogin:userLoginSlice,
            userdetails:userDetailsSlice,
            userselected:userselectedDetailsSlice,
            productdetails:productDetailsSlice,
            usercart:userCartSlice,
            searchResults:searchResultsSlice
        }
    }
)
