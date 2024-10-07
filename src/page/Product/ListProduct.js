import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import TableComponent from "../../components/Table/Table";
import { useNavigate } from "react-router-dom";

const ListProduct = () => {
    const columns = [
        { key: "sanPham", label: "Tên sản phẩm" },
        { key: "maSanPham", label: "Mã sản phẩm" },
        { key: "soLuong", label: "Số lượng" },
        { key: "giaBan", label: "Giá bán" },
        { key: "giamGia", label: "Giảm giá" },
        { key: "loaiSanPham", label: "Loại sản phẩm", isFilterable: true },
        { key: "hinh", label: "Hình", isImage: true },

        {
            key: "button",
            label: "Chỉnh sửa",
            render: (row) => (
                <button
                    onClick={(event) => handlePrint(event, row)}
                    className="mx-auto flex p-2 hover:bg-gray-200 hover:rounded-full"
                >
                    <FiEdit className="w-5 h-5" />
                </button>
            ),
        },
        {
            key: "button",
            label: "Xóa",
            render: (row) => (
                <button
                    onClick={handleDelete()}
                    className="mx-auto flex p-2 hover:bg-gray-200 hover:rounded-full"
                >
                    <MdDeleteForever className="w-5 h-5" />
                </button>
            ),
        },
    ];

    const navigate = useNavigate();
    const data = [
        {
            sanPham: "Laptop XYZ",
            maSanPham: "SP001",
            soLuong: 10,
            giaBan: "15,000,000 VND",
            giamGia: "5%",
            loaiSanPham: "Máy tính",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Điện thoại ABC",
            maSanPham: "SP002",
            soLuong: 5,
            giaBan: "10,000,000 VND",
            giamGia: "10%",
            loaiSanPham: "Điện tử",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Máy tính bảng DEF",
            maSanPham: "SP003",
            soLuong: 8,
            giaBan: "8,000,000 VND",
            giamGia: "7%",
            loaiSanPham: "Điện tử",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Tivi QLED GHI",
            maSanPham: "SP004",
            soLuong: 12,
            giaBan: "25,000,000 VND",
            giamGia: "15%",
            loaiSanPham: "Điện tử",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Máy ảnh JKL",
            maSanPham: "SP005",
            soLuong: 7,
            giaBan: "20,000,000 VND",
            giamGia: "5%",
            loaiSanPham: "Máy ảnh",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Tai nghe MNO",
            maSanPham: "SP006",
            soLuong: 30,
            giaBan: "1,000,000 VND",
            giamGia: "20%",
            loaiSanPham: "Phụ kiện",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Bàn phím PQR",
            maSanPham: "SP007",
            soLuong: 15,
            giaBan: "700,000 VND",
            giamGia: "8%",
            loaiSanPham: "Phụ kiện",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Chuột máy tính STU",
            maSanPham: "SP008",
            soLuong: 20,
            giaBan: "500,000 VND",
            giamGia: "10%",
            loaiSanPham: "Phụ kiện",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Loa Bluetooth VWX",
            maSanPham: "SP009",
            soLuong: 18,
            giaBan: "1,500,000 VND",
            giamGia: "12%",
            loaiSanPham: "Âm thanh",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Máy in YZ",
            maSanPham: "SP010",
            soLuong: 6,
            giaBan: "6,000,000 VND",
            giamGia: "10%",
            loaiSanPham: "Máy văn phòng",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        // 20 sản phẩm tiếp theo
        {
            sanPham: "Đồng hồ thông minh Alpha",
            maSanPham: "SP011",
            soLuong: 22,
            giaBan: "3,000,000 VND",
            giamGia: "15%",
            loaiSanPham: "Thiết bị đeo tay",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Máy hút bụi Beta",
            maSanPham: "SP012",
            soLuong: 8,
            giaBan: "5,500,000 VND",
            giamGia: "5%",
            loaiSanPham: "Đồ gia dụng",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Điều hòa Gamma",
            maSanPham: "SP013",
            soLuong: 5,
            giaBan: "12,000,000 VND",
            giamGia: "8%",
            loaiSanPham: "Điện lạnh",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Tủ lạnh Delta",
            maSanPham: "SP014",
            soLuong: 4,
            giaBan: "18,000,000 VND",
            giamGia: "12%",
            loaiSanPham: "Điện lạnh",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Quạt đứng Epsilon",
            maSanPham: "SP015",
            soLuong: 25,
            giaBan: "1,200,000 VND",
            giamGia: "10%",
            loaiSanPham: "Đồ gia dụng",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Máy giặt Zeta",
            maSanPham: "SP016",
            soLuong: 3,
            giaBan: "10,000,000 VND",
            giamGia: "15%",
            loaiSanPham: "Điện lạnh",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Bếp điện Eta",
            maSanPham: "SP017",
            soLuong: 6,
            giaBan: "2,500,000 VND",
            giamGia: "10%",
            loaiSanPham: "Đồ gia dụng",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Lò vi sóng Theta",
            maSanPham: "SP018",
            soLuong: 4,
            giaBan: "3,200,000 VND",
            giamGia: "7%",
            loaiSanPham: "Đồ gia dụng",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Nồi cơm điện Iota",
            maSanPham: "SP019",
            soLuong: 10,
            giaBan: "800,000 VND",
            giamGia: "5%",
            loaiSanPham: "Đồ gia dụng",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Bình đun nước Kappa",
            maSanPham: "SP020",
            soLuong: 20,
            giaBan: "600,000 VND",
            giamGia: "10%",
            loaiSanPham: "Đồ gia dụng",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Máy ép trái cây Lambda",
            maSanPham: "SP021",
            soLuong: 9,
            giaBan: "1,500,000 VND",
            giamGia: "7%",
            loaiSanPham: "Đồ gia dụng",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Tivi OLED Mu",
            maSanPham: "SP022",
            soLuong: 2,
            giaBan: "35,000,000 VND",
            giamGia: "12%",
            loaiSanPham: "Điện tử",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Máy chiếu Nu",
            maSanPham: "SP023",
            soLuong: 7,
            giaBan: "10,000,000 VND",
            giamGia: "8%",
            loaiSanPham: "Thiết bị văn phòng",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Camera an ninh Xi",
            maSanPham: "SP024",
            soLuong: 12,
            giaBan: "3,500,000 VND",
            giamGia: "10%",
            loaiSanPham: "An ninh",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Router Wifi Pi",
            maSanPham: "SP025",
            soLuong: 18,
            giaBan: "1,200,000 VND",
            giamGia: "5%",
            loaiSanPham: "Thiết bị mạng",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Máy lọc nước Rho",
            maSanPham: "SP026",
            soLuong: 4,
            giaBan: "5,000,000 VND",
            giamGia: "8%",
            loaiSanPham: "Thiết bị gia dụng",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Bàn làm việc Sigma",
            maSanPham: "SP027",
            soLuong: 10,
            giaBan: "2,200,000 VND",
            giamGia: "5%",
            loaiSanPham: "Nội thất",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Ghế văn phòng Tau",
            maSanPham: "SP028",
            soLuong: 6,
            giaBan: "1,800,000 VND",
            giamGia: "7%",
            loaiSanPham: "Nội thất",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Tủ sách Upsilon",
            maSanPham: "SP029",
            soLuong: 5,
            giaBan: "3,000,000 VND",
            giamGia: "10%",
            loaiSanPham: "Nội thất",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
        {
            sanPham: "Tủ hồ sơ Phi",
            maSanPham: "SP030",
            soLuong: 8,
            giaBan: "4,000,000 VND",
            giamGia: "12%",
            loaiSanPham: "Nội thất",
            hinh: "https://alophoto.net/wp-content/uploads/2023/05/anh-3d-thien-nhien.jpeg",
        },
    ];
    const handleRowClick = (index) => {
        navigate("/product-detail");
    };
    const handleIsFilters = () => {};
    const handlePageChange = () => {};
    const handlePrint = (event, row) => {
        event.stopPropagation();
        console.log("in");
        const printContent = `
            <div>
                <h2>Thông tin sản phẩm</h2>
                <p><strong>Tên sản phẩm:</strong> ${row.sanPham}</p>
                <p><strong>Mã sản phẩm:</strong> ${row.maSanPham}</p>
                <p><strong>Số lượng:</strong> ${row.soLuong}</p>
                <p><strong>Giá bán:</strong> ${row.giaBan}</p>
                <p><strong>Giảm giá:</strong> ${row.giamGia}</p>
                <p><strong>Loại sản phẩm:</strong> ${row.loaiSanPham}</p>
            </div>
        `;
        const printWindow = window.open("", "", "width=600,height=400");
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };
    const handleDelete = () => {
        console.log("delete");
    };
    const handleAdd = () => {
        console.log("add");
        navigate("/product-add");
    };
    return (
        <TableComponent
            columns={columns}
            data={data}
            title="Sản phẩm"
            contentButton="Thêm sản phẩm"
            onPageChange={handlePageChange}
            onRowClick={handleRowClick}
            handleIsFilters={handleIsFilters}
            handleAdd={handleAdd}
        />
    );
};

export default ListProduct;
