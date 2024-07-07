import React  from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Product from "../components/Product";
import { useGetProductsQuery, useGetTopProductsQuery } from "../redux/slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useNavigate, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import { Button } from "react-bootstrap";
import TopRatedCarousel from "../components/TopRatedCarousel";
import { useDispatch, useSelector } from "react-redux";
import Search from "../components/Search";


const HomeScreen = () => {

  const {pageNumber,keyword}=useParams()

   const {data:products,isLoading,isError}=useGetProductsQuery({keyword,pageNumber});

    const {data:topProducts,isLoading:topLoad,isError:topErr}=useGetTopProductsQuery()

    
    const { userInfo } = useSelector((state) => state.login);

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
 

  return (

    <>
    {
      keyword && <Link to='/'><Button className="ms-5" variant="warning"> Go Back</Button></Link>
    }
    

{

    isLoading ? (
           
           <Loader/>
    ) 
    
    : isError ? (

      <Message variant={'danger'}>{isError?.data.message || isError.error }</Message>
    ) : 
    (

    
      <div>
   
     

     


      {topLoad && <Loader/>}

     { !keyword && <TopRatedCarousel topPro={topProducts}/> }



     <div className="mt-5  mb-5 d-flex justify-content-center align-items-center">
  <Search />
</div>





      <Row className="mt-5">
        {products.products?.map((product,idx) => (
          <Col sm={12} md={6} lg={4} key={idx+2}>
            <Product product={product} />
          </Col>
        ))}
      </Row>


   
    <Row>

  
    <Col md={9} xs={8}>

    </Col>


    <Col md={3} xs={4}>

    <Paginate pages={products.pages} page={products.page} keyword={keyword ? keyword : ""} />

      
    </Col>

    </Row>
 
   
         
    </div>
  )
}

</>
    )

}



  
export default HomeScreen;
