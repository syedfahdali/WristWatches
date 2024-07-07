import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/slices/productsApiSlice";
import { useProductUpdateProductMutation, useUploadImageMutation } from "../../redux/slices/adminSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";


const EditProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [category, setCategory] = useState('');
  const [image,setImage]=useState('/images/phone.jpg')


   const{id}=useParams()


         const {data:productData,isLoading,isError}=    useGetProductDetailsQuery(id)
          
       const [productUpdate,{isLoading:updateLoad,isError:updateProErr}] =  useProductUpdateProductMutation()
        
         

   useEffect(()=>{
        
    if(productData){

        setName(productData.name)
        setDescription(productData.description)
        setPrice(productData.price)
        setBrand(productData.brand)
        setCategory(productData.category)
        setCountInStock(productData.countInStock)
        
    }
       
   },[productData])
   


 
  const navigate= useNavigate()

 const [uploadImage,{isLoading:uploadLoad,isError:uploadErr}]= useUploadImageMutation()

  
  

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    console.log('name',name,'desc',description,'price',price,'brand',brand,'count',countInStock,'category',category,'productid',id)

  const  detailz={

        _id:id,
        name,
        description,
        category,
        brand,
        price,
        image,
        countInStock
    }

    try{

      const updatedDetails=   await productUpdate(detailz)
      console.log('upd',updatedDetails)
      toast.success('product updated successfully')
      navigate('/admin/listallproducts')



    }


    catch(err){

        console.log(err)
    }

    
    
                  
  };


  const imageUploadHanler=async(e)=>{

    const formData=new FormData()



       formData.append('image',e.target.files[0])

       try{


              const res=  await uploadImage(formData).unwrap()
              toast.success(res.message)
              setImage(res.image)

       }

       catch(err){

        console.log(err)
        toast.error(err?.data.message||err.error)

       }
  }

  return (


    <>
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
          <h2 className="mb-5 text-center fw-bold text-white">Edit Product</h2>

          <Form className="edit-product-form" onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-white mb-2">Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label className="text-white mb-2">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label className="text-white mb-2">Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-white mb-2">Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter Brand name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>


            <Form.Group className="mb-3" controlId="exampleForm.ControlInput9">
              <Form.Label className="text-white mb-2">Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter category name"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label className="text-white mb-2">Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter count in stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput39">
              <Form.Label className="text-white mb-2">Upload Image</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />


               <Form.Control
                type="file"
                onChange={imageUploadHanler}
              />
            </Form.Group>




            <Button
                  variant="danger"
                  className="mb-5 mt-3 loginBtn"
                  type="submit"
                >
                  Update
                </Button>


          </Form>
        </Container>
      </FormContainer>
    </div>
    )}
    </>
  )
}

export default EditProduct;
