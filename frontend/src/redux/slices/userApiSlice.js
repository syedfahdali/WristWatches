import { USERS_URL} from "../constants/constants";
import { apiSlice } from "./apiSlice";


export const userApiSlice=apiSlice.injectEndpoints({

    endpoints:(builder)=>({

        login:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/login`,
                method:'POST',
                body:data
            }),

            keepUnusedDataFor:5,
        }),

        logout:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method:'POST',
                
            }),

            keepUnusedDataFor:5,
        }),

        register:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}`,
                method:'POST',
                body:data
                
            }),

            keepUnusedDataFor:5,
        }),



        update:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/profile`,
                method:'PUT',
                body:data
                
            }),

            keepUnusedDataFor:5,
        }),
        
       
    })
})


export const {useLoginMutation,useLogoutMutation,useRegisterMutation,useUpdateMutation}=userApiSlice