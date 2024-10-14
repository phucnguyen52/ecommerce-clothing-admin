import React, { useEffect, useState } from "react";
import TableComponent from "../../components/Table/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ListCategory = () => {
    const [data, setData] = useState([]);

    const columns = [
        { key: "id", label: "Mã Danh Mục" },
        { key: "categoryName", label: "Tên Danh Mục" },
        {
            key: "categoryImage",
            label: "Hình Ảnh",
            render: (row) => (
                <img
                    src={row.categoryImage}
                    alt={row.categoryName}
                    className="w-16 h-16 object-cover"
                />
            ),
        },
    ];

    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/admin/category",
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                setData(response.data.category);
            }
        } catch (error) {
            console.error("Lỗi khi fetch:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handlePageChange = () => {};

    const navigate = useNavigate();

    const handleAdd = () => {
        navigate("/add-category");
    };
    return (
        <div className="w-2/3 mx-auto">
            <TableComponent
                title="Danh sách danh mục"
                columns={columns}
                data={data}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default ListCategory;
