import { createBrowserRouter, redirect } from "react-router-dom";
import { APP_ROUTER } from "../utils/Constants";
import MainLayout from "../layout/Main/MainLayout";
import AuthLayout from "../layout/Auth/AuthLayout";
import HomePage from "../page/Home/HomePage";

import ProductPage from "../page/Product/ProductPage";
import Login from "../page/Auth/Login/Login";
import Register from "../page/Auth/Register/Register";
import AdminChat from "../page/Customer/AdminChat";
import LogOut from "../page/Auth/LogOut/LogOut";
import Customer from "../page/Customer/Customer";
import Voucher from "../page/Product/Voucher";
import CreateVoucher from "../page/Product/CreateVoucher";
import ListProduct from "../page/Product/ListProduct";
import ListOrder from "../page/Order/ListOrder";
import ProductDetail from "../page/Product/ProductDetail";
import AddProduct from "../page/Product/AddProduct";
import ListProvider from "../page/Provider/ListProvider";
import RevenueChart from "../components/Charts/RevenueChart";
const router = createBrowserRouter([
    {
        path: "/",
        loader: () => {
            if (!localStorage.getItem("user")) {
                throw redirect(APP_ROUTER.HOME);
            }
            return null;
        },
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: APP_ROUTER.HOME,
                element: <HomePage />,
                index: true,
            },
            {
                path: APP_ROUTER.PRODUCT,
                element: <ProductPage />,
            },
            {
                path: APP_ROUTER.CHAT,
                element: <AdminChat />,
            },
            {
                path: APP_ROUTER.CUSTOMER,
                element: <Customer />,
            },
            {
                path: APP_ROUTER.VOUCHER,
                element: <Voucher />,
            },
            {
                path: APP_ROUTER.CREATEVOUCHER,
                element: <CreateVoucher />,
            },
            {
                path: APP_ROUTER.LISTPRODUCT,
                element: <ListProduct />,
            },
            {
                path: APP_ROUTER.LISTORDER,
                element: <ListOrder />,
            },
            {
                path: APP_ROUTER.PRODUCTDETAIL,
                element: <ProductDetail />,
            },
            {
                path: APP_ROUTER.ADD_PRODUCT,
                element: <AddProduct />,
            },
            {
                path: APP_ROUTER.LIST_PROVIDER,
                element: <ListProvider />,
            },
            {
                path: APP_ROUTER.REVENUECHART,
                element: <RevenueChart />,
            },
        ],
    },

    {
        path: APP_ROUTER.AUTH,
        element: <AuthLayout />,
        children: [
            {
                path: APP_ROUTER.LOGIN,
                element: <Login />,
                index: true,
            },
            {
                path: APP_ROUTER.REGISTER,
                element: <Register />,
            },
            {
                path: APP_ROUTER.LOGOUT,
                element: <LogOut />,
            },
        ],
    },
]);

export default router;
