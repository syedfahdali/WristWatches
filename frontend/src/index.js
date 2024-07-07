import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "./bootstrap.min.css";
import HomeScreen from "./screens/HomeScreen";
import {
  PayPalScriptProvider,
  payPalScriptProvider,
} from "@paypal/react-paypal-js";
import ProductScreens from "./screens/ProductScreens";
import store from "./utils/store";
import { Provider } from "react-redux";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoutes from "./components/PrivateRoutes";
import PaymentMethod from "./screens/PaymentMethod";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import UsersProfileScreen from "./screens/UsersProfileScreen";
import AdminRoutes from "./components/AdminRoutes";
import OrderListScreen from "./screens/Admin/OrderListScreen";
import AdminOrderDetails from "./screens/Admin/AdminOrderDetails";
import ListAllProducts from "./screens/Admin/ListAllProducts";
import EditProduct from "./screens/Admin/EditProduct";
import ShowAllUsers from "./screens/Admin/ShowAllUsers";
import EditUser from "./screens/Admin/EditUser";
import {HelmetProvider} from 'react-helmet-async'
import ViewMyOrders from "./screens/ViewMyOrders";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />

      <Route  path="/page/:pageNumber" element={<HomeScreen />} />

      <Route  path="/search/:keyword" element={<HomeScreen />} />

      <Route  path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />

      <Route path="/product/:id" element={<ProductScreens />} />

      <Route path="/cart" element={<CartScreen />} />

      <Route path="/login" element={<LoginScreen />} />

      <Route path="/register" element={<RegisterScreen />} />

      {/* private Routes component */}

      <Route path="" element={<PrivateRoutes />}>
        <Route path="/shipping" element={<ShippingScreen />} />

        <Route path="/payment-method" element={<PaymentMethod />} />

        <Route path="/place-order" element={<PlaceOrderScreen />} />

        <Route path="/order-Details/:id" element={<OrderDetailsScreen />} />

        <Route path="/profile" element={<UsersProfileScreen />} />

        <Route path="/view-myorders" element={<ViewMyOrders />} />

{/* 
          AdminRoutes component */}



          <Route path="" element={<AdminRoutes />}>
        <Route path="/admin/ordersList" element={<OrderListScreen />} />
        <Route path="/admin/orderDetails/:id" element={<AdminOrderDetails />} />
        <Route path="/admin/listallproducts" element={<ListAllProducts/>} />
        <Route path="/admin/listallproducts/:pageNumber" element={<ListAllProducts/>} />
        <Route path="/admin/editproduct/:id" element={<EditProduct/>} />
        <Route path="/admin/showallusers" element={<ShowAllUsers/>} />
        <Route path="/admin/edituser/:id" element={<EditUser/>} />
      </Route>



      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <HelmetProvider>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
