import {configureStore} from '@reduxjs/toolkit'
import userLoginSlice from './slices/userLoginSlice'
import usercartSlice from './slices/usercartSlice'

export const store=configureStore(
    {
        reducer:
        {
            userLogin:userLoginSlice,
            usercart:usercartSlice
        }
    }
)
