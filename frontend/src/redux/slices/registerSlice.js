import { createSlice } from "@reduxjs/toolkit";


const initialState={userInfo: localStorage.getItem('userInfo') ?  JSON.parse(localStorage.getItem('userInfo')) : null }

const registerSlice=createSlice(
    {
        name:'register',
        initialState,
        reducers:{

            userRegister:(state,action)=>{

                state.userInfo=action.payload

                localStorage.setItem('userInfo',JSON.stringify(action.payload))


            }
        }

    }
)
export const {userRegister} =registerSlice.actions
export default registerSlice.reducer
