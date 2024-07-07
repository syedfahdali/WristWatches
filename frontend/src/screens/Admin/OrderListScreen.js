import React from "react";
import { useGetAllOrdersQuery } from "../../redux/slices/adminSlice";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { FaCheck, FaRegTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const OrderListScreen = () => {
  const { data: allOrders, isLoading, isError } = useGetAllOrdersQuery();

  console.log("allOrders", allOrders);

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
          <h2 className="text-center mb-5">All Orders </h2>

          <Container>
            <Row className="text-center">
              <Col ms={12} xs={12}>
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>Sl</th>
                      <th>image</th>
                      <th>Product</th>
                      <th>Ordered By</th>
                      <th>isDelivered</th>
                      <th>View Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allOrders?.map((orders) =>
                      orders.orderItems?.map((orderz, idx) => (
                        <tr className="pt-5" key={orderz.name}>
                          <td>{idx + 1}</td>
                          <td>
                            <img
                              src={orderz.image}
                              alt="image"
                              style={{ height: "40px" }}
                            />
                          </td>
                          <td>{orderz.name}</td>
                          <td>{orders.user.name}</td>
                          <td className="mt-3">
                            {orders.isDelivered ? (
                              <FaCheck />
                            ) : (
                              <FaRegTimesCircle />
                            )}
                          </td>

                          <td className="p-3">
                            {" "}
                            <Link to={`/admin/orderDetails/${orders._id}`}>
                              <Button>view Details</Button>
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default OrderListScreen;
