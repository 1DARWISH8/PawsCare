import {configureStore} from '@reduxjs/toolkit'
import userLoginSlice from './slices/userLoginSlice'
import usercartSlice from './slices/usercartSlice'
import productDetailsSlice from './slices/productDetailsSlice'
import userDetailsSlice from './slices/userDetailsSlice'
import userselectedDetailsSlice from './slices/userselectedDetailsSlice'

export const store=configureStore(
    {
        reducer:
        {
            userLogin:userLoginSlice,
            usercart:usercartSlice,
            userdetails:userDetailsSlice,
            userselected:userselectedDetailsSlice,
            productdetails:productDetailsSlice
        }
    }
)
