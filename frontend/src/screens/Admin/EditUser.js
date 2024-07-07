import React, { useEffect, useState } from 'react'
import FormContainer from '../../components/FormContainer'
import { Button, Container, Form } from 'react-bootstrap'
import { useGetUserByIdQuery, useUpdateUserByIdMutation } from '../../redux/slices/adminSlice'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { toast } from 'react-toastify'


const EditUser = () => {

const [name,setName]=useState('')
const [email,setEmail]=useState('')
const [isAdmin,setIsAdmin]=useState('')

 const {id}=useParams()
  const navigate=useNavigate()


  const {data:getUserDetails,isLoading, isError}=useGetUserByIdQuery(id)

  const [updateUserById,{isLoading:editLoad,isError:editErr}]=useUpdateUserByIdMutation()
                

useEffect(()=>{

     if(getUserDetails){

        setName(getUserDetails.name)
        setEmail(getUserDetails.email)
        setIsAdmin(getUserDetails.isAdmin)
     }
    
},[getUserDetails])




const handleFormSubmit=async(e)=>{

e.preventDefault()

console.log(name,email)

  try{

     await  updateUserById({name,email,isAdmin,id})

     toast.success('user updated successfully')
     navigate('/admin/showallusers')
  }

  catch(err){

    console.log(err)
    toast.error(err?.data.message || err.error)
  }

}



  return (

    <>
    {editLoad && <Loader/>}
    {isLoading ? (
      <Loader />
    ) : isError ? (
      <Message variant="danger">
        {isError?.data.message || isError.error}
      </Message>
    ) : (
    <div>
      <FormContainer>
       <Container>
        <h2 className="mb-5 text-center fw-bold text-white">Edit user</h2>

        <Form className="login-form" onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput10">
            <Form.Label className="text-white mb-2">UserName</Form.Label>
            <Form.Control
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
             
            />
             </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput14">
            <Form.Label className="text-white mb-2">Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
             
            />
           
           </Form.Group>


           <Form.Group className="mb-3" controlId="exampleForm.ControlInput19">
            
            <Form.Check
              type="checkbox"
              label='isAdmin'
            checked={isAdmin}
              onChange={(e) => setIsAdmin(!isAdmin)}
             
            />
           
           </Form.Group>

        

          <Button variant="danger" className="mb-5 mt-3" type="submit">
            update
          </Button>

        </Form>
        </Container>
      </FormContainer>
    </div>
    )}
    </>
  )
}
export default EditUser
