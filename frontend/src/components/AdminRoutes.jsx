import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const AdminRoutes = () => {
  const { userInfo } = useSelector((state) => state.login);

  return (
    <div>{userInfo.isAdmin ? <Outlet /> : <Navigate to={"/login"} />}</div>
  );
};

export default AdminRoutes;
