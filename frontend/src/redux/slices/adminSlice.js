import { ADMIN_URL, UPLOAD_URL } from "../constants/constants";
import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/orders/allorders`,
      }),

      keepUnusedDataFor: 5,
    }),

    deliverOrder: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/orders/${id}/delivered`,
        method: "PUT",
      }),
    }),

    addProduct: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/products`,
        method: "POST",
      }),

      invalidatesTags: ["Product"],
    }),



    
    productUpdateProduct: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/editProducts/${data._id}`, 
        method: "PUT",
        body:data,
      }),

      invalidatesTags: ["Products"],
    }),


    uploadImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`, 
        method: "POST",
        body:data,
      }),

    }),  



    
    DeleteProduct: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/deleteproducts/${id}`, 
        method: "DELETE",
       
      }),
    }),        

    getAllUsers: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/getallusers`,
      }),

      keepUnusedDataFor: 5,
      providesTags: ['Users'],
    }),  
              

                  
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/${id}`, 
        method: "DELETE",
       
      }),
    }),           
    

    getUserById: builder.query({
      query: (id) => ({
        url: `${ADMIN_URL}/${id}`,
      }),

      keepUnusedDataFor: 5,
      invalidatesTags: ['Users'],
    }),  


    updateUserById: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/${data.id}`, 
        method: "PUT",
        body:data
       
      }),
    }),         
    



  }),
});

export const {
  useGetAllOrdersQuery,
  useDeliverOrderMutation,
  useAddProductMutation,
  useProductUpdateProductMutation,
  useUploadImageMutation,
  useDeleteProductMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation

} = orderApiSlice;
