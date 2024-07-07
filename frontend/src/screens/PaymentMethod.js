import React, { useEffect, useState } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../redux/slices/cartSlice'

const PaymentMethod = () => {

<CheckoutSteps step1={'step1'} step2={'step2'} step3={'step3'}/>

const [paymentmethod,setPaymentMethod]=useState('')

 const dispatch=useDispatch()
 const navigate=useNavigate()

  const {shippingAddress}= useSelector((state)=>state?.cart)


 useEffect(()=>{

  if(!shippingAddress){

    navigate('/shipping')
  }
     

 },[navigate,shippingAddress])


const submitHandler=(e)=>{


     e.preventDefault()
   
    dispatch(savePaymentMethod(paymentmethod))
    navigate('/place-order')
     
}

  return (

      



    <Row>

   <Col md={4} xs={3}>

   </Col>

   <Col md={8} xs={9}>
   
     <h2 className='mb-5 fw-bold text-white'>Payment Method</h2>

     <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className='mb-3'> Select Payment Method</Form.Label>
        <Form.Check // prettier-ignore
            type={'radio'}
            label={'paypal'}
            id={`default-radio`}
            
            value='paypal'
            onChange={(e)=>setPaymentMethod(e.target.value)}
          />


          <Button type='submit' className='mt-5' variant='primary'>Submit</Button>


      </Form.Group>
      
    </Form>

   </Col>
      
    </Row>
  )
}

export default PaymentMethod
