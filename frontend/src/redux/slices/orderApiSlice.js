import { ORDERS_URL, PAYPAL_URL} from "../constants/constants";
import { apiSlice } from "./apiSlice";


export const orderApiSlice=apiSlice.injectEndpoints({

    endpoints:(builder)=>({

        createOrder:builder.mutation({
            query:(order)=>({
                url:`${ORDERS_URL}`,
                method:'POST',
                body:{...order}
            }),

            keepUnusedDataFor:5,
        }),

        getOrderDetails:builder.query({
            query:(id)=>({
                url:`${ORDERS_URL}/${id}/orderDetails`
                
            }),

            keepUnusedDataFor:5,
        }),

        

        getAllMyorders:builder.query({
            query:(id)=>({
                url:`${ORDERS_URL}/myorders`
                
            }),

            keepUnusedDataFor:5,
        }),

        payOrder:builder.mutation({
            query:({id,details})=>({
                url:`${ORDERS_URL}/${id}/orderDetails`,  
                method:'PUT',
                body:{...details}
            }),

            keepUnusedDataFor:5,
        }),

        getPayPalClientId:builder.query({
            query:()=>({
                url:PAYPAL_URL
                
            }),

            keepUnusedDataFor:5,
        }),
        


        
       
    })
})


export const {useCreateOrderMutation,useGetOrderDetailsQuery,usePayOrderMutation,useGetPayPalClientIdQuery,useGetAllMyordersQuery}=orderApiSlice