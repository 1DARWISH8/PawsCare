import {configureStore} from '@reduxjs/toolkit'
import userLoginSlice from './slices/userLoginSlice'
import usercartSlice from './slices/usercartSlice'
import userDetailsSlice from './slices/userDetailsSlice'
import productDetailsSlice from './slices/productDetailsSlice'

export const store=configureStore(
    {
        reducer:
        {
            userLogin:userLoginSlice,
            usercart:usercartSlice,
            userdetails:userDetailsSlice,
            productdetails:productDetailsSlice
        }
    }
)
