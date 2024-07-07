import React from 'react'
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Container } from 'react-bootstrap';

const FormContainer = ({children}) => {
  return (
    <div>
      
      <Container>
        <Row className='justify-content-md-center'>

           <Col md={6}  xs={12} >

             {children}

           </Col>


        </Row>
        </Container>
      
    </div>
  )
}

export default FormContainer
