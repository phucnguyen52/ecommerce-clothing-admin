import React, { useState } from "react";
import Header from "../../components/Shared/Header";
import Footer from "../../components/Shared/Footer";
import { APP_ROUTER } from "../../utils/Constants";
import { Link, Outlet } from "react-router-dom";
import {
    FundViewOutlined,
    AppstoreOutlined,
    UserOutlined,
    ShoppingCartOutlined,
    ShopOutlined,
    TeamOutlined,
    SolutionOutlined,
    LogoutOutlined,
    HomeOutlined,
    ProductOutlined,
    ImportOutlined,
    PercentageOutlined,
    SisternodeOutlined,
    DollarOutlined,
    FileSyncOutlined,
    PlusCircleOutlined,
    MinusCircleOutlined,
    CarOutlined,
    ContainerOutlined,
    BarChartOutlined,
    InboxOutlined,
    WalletOutlined,
    LineChartOutlined,
    FundOutlined,
    MessageOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import ToggleThemeButton from "../../components/ToggleTheme/ToggleThemeButton";
import Logo from "../../components/Logo/Logo";

const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
function MainLayout() {
    const [darkTheme, setDarkTheme] = useState(false);
    const toggleTheme = () => {
        setDarkTheme((darkTheme) => !darkTheme);
    };
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const items = [
        getItem(
            <Link to={APP_ROUTER.HOME}>Trang chủ</Link>,
            "1",
            <HomeOutlined />
        ),
        getItem("Quản lý", "sub1", <AppstoreOutlined />, [
            getItem(
                <Link to={APP_ROUTER.REVENUECHART}>Tổng quan</Link>,
                "2",
                <FundViewOutlined />
            ),
            getItem(
                <Link to={APP_ROUTER.LISTORDER}>Đơn hàng</Link>,
                "3",
                <ShoppingCartOutlined />
            ),
            getItem(
                <Link to={APP_ROUTER.LISTPRODUCT}>Hàng hóa</Link>,
                "4",
                <ProductOutlined />
            ),
            getItem(
                <Link to={APP_ROUTER.PRODUCT}>Nhập hàng</Link>,
                "5",
                <ImportOutlined />
            ),
            getItem(
                <Link to={APP_ROUTER.PRODUCT}>Kho hàng</Link>,
                "6",
                <ShopOutlined />
            ),
            getItem(
                <Link to={APP_ROUTER.VOUCHER}>Khuyến mãi</Link>,
                "7",
                <PercentageOutlined />
            ),
        ]),
        getItem("Khách hàng", "sub2", <SolutionOutlined />, [
            getItem(
                <Link to={APP_ROUTER.CUSTOMER}>Khách hàng</Link>,
                "8",
                <UserOutlined />
            ),
            getItem(
                <Link to={APP_ROUTER.LIST_PROVIDER}>Nhà cung cấp</Link>,
                "9",
                <SisternodeOutlined />
            ),
            getItem(
                <Link to={APP_ROUTER.PRODUCT}>Nhóm khách hàng</Link>,
                "10",
                <TeamOutlined />
            ),
            getItem(
                <Link to={APP_ROUTER.CHAT}>Tư vấn khách hàng</Link>,
                "21",
                <MessageOutlined />
            ),
        ]),
        getItem("Tiền bạc", "sub3", <DollarOutlined />, [
            getItem(
                <Link to={APP_ROUTER.ADD_PRODUCT}>Tổng quan</Link>,
                "11",
                <FileSyncOutlined />
            ),
            getItem(
                <Link to={APP_ROUTER.PRODUCT}>Thu</Link>,
                "12",
                <PlusCircleOutlined />
            ),
            getItem(
                <Link to={APP_ROUTER.PRODUCT}>Chi</Link>,
                "13",
                <MinusCircleOutlined />
            ),
        ]),
        getItem(
            <Link to={APP_ROUTER.NEEDS_COLLECTIONS}>Bán hàng Online</Link>,
            "14",
            <CarOutlined />
        ),
        getItem("Báo cáo", "sub4", <ContainerOutlined />, [
            getItem(
                <Link to={APP_ROUTER.ADD_STORE}>Doanh số</Link>,
                "15",
                <FundOutlined />
            ),
            getItem(
                <Link to={APP_ROUTER.STORE}>Hàng hóa</Link>,
                "16",
                <InboxOutlined />
            ),
            getItem(
                <Link to={APP_ROUTER.ADD_STORE}>Tồn kho</Link>,
                "17",
                <WalletOutlined />
            ),
            getItem(
                <Link to={APP_ROUTER.STORE}>Lợi nhuận</Link>,
                "18",
                <LineChartOutlined />
            ),
            getItem(
                <Link to={APP_ROUTER.STORE}>Báo cáo tháng</Link>,
                "19",
                <BarChartOutlined />
            ),
        ]),
        // getItem("Đơn hàng", "sub3", <ShoppingCartOutlined />, [
        //     getItem(<Link to={"/order/1"}>Đang chờ xác nhận</Link>, "8"),
        //     getItem(<Link to={"/order/2"}>Đang chờ vận chuyển</Link>, "9"),
        //     getItem(<Link to={"/order/3"}>Đang giao hàng</Link>, "10"),
        //     getItem(<Link to={"/order/4"}>Đã giao</Link>, "11"),
        // ]),
        // getItem(
        //     <Link to={APP_ROUTER.LISTUSER}>Người dùng</Link>,
        //     "12",
        //     <TeamOutlined />
        // ),
        getItem(
            <Link to={APP_ROUTER.LOGOUT}>Đăng xuất</Link>,
            "20",
            <LogoutOutlined />
        ),
    ];
    return (
        <>
            <div className="mx-auto w-full" style={{ maxWidth: "100vw" }}>
                <Layout
                    style={{
                        minHeight: "100vh",
                        position: "relative",
                    }}
                    theme={darkTheme ? "dark" : "light"}
                >
                    <Sider
                        width={250}
                        collapsible
                        collapsed={collapsed}
                        className="shadow-md overflow-y-auto max-h-screen "
                        onCollapse={(value) => setCollapsed(value)}
                        theme={darkTheme ? "dark" : "light"}
                    >
                        <Logo></Logo>
                        <Menu
                            defaultSelectedKeys={["1"]}
                            mode="inline"
                            items={items}
                            theme={darkTheme ? "dark" : "light"}
                            className="pt-5"
                        />
                        <ToggleThemeButton
                            darkTheme={darkTheme}
                            toggleTheme={toggleTheme}
                        ></ToggleThemeButton>
                    </Sider>

                    <Layout className="overflow-y-auto max-h-screen">
                        <Header />
                        <Content className="bg-gray-100 ">
                            <Outlet />
                            {/* <div>main layout</div> */}
                        </Content>
                    </Layout>
                </Layout>
            </div>
        </>
    );
}

export default MainLayout;
