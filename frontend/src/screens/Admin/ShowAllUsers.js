import React from "react";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../redux/slices/adminSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import {
  FaCheck,
  FaRegEdit,
  FaRegTimesCircle,
  FaRegTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ShowAllUsers = () => {
  const {
    data: getallusers,
    isLoading,
    isError,
    refetch,
  } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: deleteUserLoad, isError: deleteuserErr }] =
    useDeleteUserMutation();

  const deleteUserHandler = async (id) => {
    console.log("idd", id);
    if (window.confirm("are you sure to delete")) {
      try {
        await deleteUser(id);
        toast.success("deleted user successfully....");
        refetch();
      } catch (err) {
        console.log(err);
        toast.error("error deleting user");
      }
    }
  };

  console.log("ress", getallusers);

  return (
    <>
      {deleteUserLoad && <Loader />}

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
                      <th>Name</th>
                      <th>Email</th>
                      <th>isAdmin</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getallusers?.map((user, idx) => (
                      <tr className="pt-5" key={user.name}>
                        <td>{idx + 1}</td>

                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td className="mt-3">
                          {user.isAdmin ? <FaCheck /> : <FaRegTimesCircle />}
                        </td>

                        <td className="mt-3">
                          <Link to={`/admin/edituser/${user._id}`}> 
                            {" "}
                            <Button variant="success">
                              <FaRegEdit style={{ color: "white" }} />
                            </Button>{" "}
                          </Link>
                        </td>

                        <td className="mt-3">
                          <Button
                            variant="danger"
                            onClick={() => deleteUserHandler(user._id)}
                          >
                            <FaRegTrashAlt style={{ color: "white" }} />
                          </Button>
                        </td>
                      </tr>
                    ))}
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

export default ShowAllUsers;
