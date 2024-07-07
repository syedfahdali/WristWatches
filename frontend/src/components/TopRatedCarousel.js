import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import banner1 from '../pics/banner-2.jpg';
import banner2 from '../pics/banner-3.jpg';
import banner3 from '../pics/banner-4.avif';

const TopRatedCarousel = ({ topPro }) => {
  const [topPros, setTopPros] = useState(topPro);

  useEffect(() => {
    if (!Array.isArray(topPros) && Array.isArray(topPro) && topPro?.length > 0) {
      setTopPros(topPro);
    }
  }, [topPros, setTopPros, topPro]);
  

  return (
    <div className='topProCaro'>
      <Container>
        <Carousel >
          <Carousel.Item className='banner1pic'>
            <Link to={`/product/${topPros?.length > 0 && topPros[0]?._id}`}><img
              className="d-block w-100 pic1caro"
              src={banner1}
              alt="First slide"
              style={{height:'300px'}}
            />  </Link>
            <Carousel.Caption className='banner1des' >
              <h3>{topPros?.length > 0 && topPros[0]?.name}</h3>
              <p className='mt-5 topProCarop'>{topPros?.length > 0 && topPros[0]?.description.substring(0,130)}</p>
              <h2 className='text-warning mt-3 fw-bold'> ₹ {topPros?.length > 0 && topPros[0]?.price}</h2>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
          <Link to={`/product/${topPros?.length > 0 && topPros[1]?._id}`}> <img
              className="d-block w-100  pic1caro"
              src={banner2}
              alt="Second slide"
            />  </Link>

            <Carousel.Caption className='banner1des' >
              <h3>{topPros?.length > 1 && topPros[1]?.name}</h3>
              <p className='mt-5 topProCarop'>{topPros?.length > 1 && topPros[1]?.description.substring(0,130)}</p>
              <h2 className='text-warning mt-3 fw-bold'> ₹ {topPros?.length > 1 && topPros[1]?.price}</h2>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
          <Link to={`/product/${topPros?.length > 0 && topPros[2]?._id}`}> <img
              className="d-block w-100  pic1caro"
              src={banner3}
              alt="Third slide"
            /> </Link>

            <Carousel.Caption className='banner1des' >
              <h3>{topPros?.length > 2 && topPros[2]?.name}</h3>
              <p className='mt-5 topProCarop'>{topPros?.length > 2 && topPros[2]?.description.substring(0,130)}</p>
              <h2 className='text-warning mt-3 fw-bold'> ₹ {topPros?.length > 2 && topPros[2]?.price}</h2>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
};

export default TopRatedCarousel;
