import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import TableComponent from "../../components/Table/Table";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ListProduct = () => {
    const columns = [
        { key: "id", label: "Mã SP" },
        { key: "nameProduct", label: "Tên sản phẩm" },

        { key: "quantitySell", label: "Số lượng" },
        { key: "price", label: "Giá bán" },
        { key: "discount", label: "Giảm giá" },
        { key: "categoryName", label: "Loại sản phẩm", isFilterable: true },
        { key: "image", label: "Hình", isImage: true },

        {
            key: "button",
            label: "Chỉnh sửa",
            render: (row) => {
                console.log(row);
                return (
                    <Link to={`/product/${row.id}`}>
                        <button className="mx-auto flex p-2 hover:bg-gray-200 hover:rounded-full">
                            <FiEdit className="w-5 h-5" />
                        </button>
                    </Link>
                );
            },
        },
        {
            key: "button",
            label: "Xóa",
            render: (row) => (
                <button
                    onClick={(event) => handleDelete(event, row)}
                    className="mx-auto flex p-2 hover:bg-gray-200 hover:rounded-full"
                >
                    <MdDeleteForever className="w-5 h-5" />
                </button>
            ),
        },
    ];
    const [data, setData] = useState([]);
    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/customer/product?sort=price&page=1&type=DESC&max=1000000&min=0",
                {
                    withCredentials: true,
                }
            );

            if (response.status === 201) {
                setData(response.data.product);
                console.log("đã set", response.data.product);
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    const navigate = useNavigate();

    const handleRowClick = (index) => {
        
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
    const handleDelete = async (event, row) => {
        event.stopPropagation();
        try {
            const response = await axios.delete(
                `http://localhost:8080/api/admin/product/${row.id}`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 201) {
                fetchProducts();
                toast.success("Xóa sản phẩm thành công", {
                    autoClose: 1000,
                });
            } else {
                console.error("Có lỗi xảy ra khi xóa sản phẩm:", response.data);
            }
        } catch (error) {
            console.error("Có lỗi xảy ra khi gọi API xóa sản phẩm:", error);
        }
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
