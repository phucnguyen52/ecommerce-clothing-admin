import React, { useState } from "react";
import TableComponent from "../../components/Table/Table";
import { AiFillPrinter } from "react-icons/ai";
import data from "./data";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaWindowClose } from "react-icons/fa";
import ModalAdd from "./ModalAdd";
const ListProvider = () => {
    const [expandedRow, setExpandedRow] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const columns = [
        { key: "id", label: "ID" },
        { key: "fullName", label: "Tên nhà cung cấp" },
        { key: "numberPhone", label: "Số điện thoại" },
        { key: "address", label: "Địa chỉ" },
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

    const handleRowClick = (index) => {
        if (expandedRow.includes(index)) {
            setExpandedRow(
                expandedRow.filter((rowIndex) => rowIndex !== index)
            );
        } else {
            setExpandedRow([...expandedRow, index]);
        }
    };

    const handlePrint = (row) => {
        console.log("In thông tin nhà cung cấp:", row.id);
    };
    const handleDelete = () => {
        console.log("delete");
    };
    const handlePageChange = () => {
        setExpandedRow([]);
    };

    const renderExpandedRow = (row) => {
        return (
            <div
                className={`transition-all duration-300 ${
                    expandedRow === null
                        ? "animate-fade-out"
                        : "animate-fade-in-down"
                } p-4`}
            >
                <h3 className="font-bold mb-2">Chi tiết nhà cung cấp</h3>
                <div>
                    <p>
                        <strong>Tên:</strong> {row.fullName}
                    </p>
                    <p>
                        <strong>Số điện thoại:</strong> {row.numberPhone}
                    </p>
                    <p>
                        <strong>Địa chỉ:</strong> {row.address}
                    </p>
                </div>
            </div>
        );
    };
    const handleAdd = () => {
        setOpenAdd(!openAdd);
    };
    return (
        <>
            <TableComponent
                title="Nhà Cung Cấp"
                contentButton="Thêm nhà cung cấp"
                columns={columns}
                data={data}
                expandedRow={expandedRow}
                onRowClick={handleRowClick}
                onPageChange={handlePageChange}
                renderExpandedRow={renderExpandedRow}
                handleAdd={handleAdd}
            />
            {openAdd && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={handleAdd}
                    ></div>
                    <div className="relative mx-auto my-6 w-[60%]">
                        <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                            <ModalAdd
                                title="Thêm nhà cung cấp"
                                handleCloseModalAddAddress={handleAdd}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ListProvider;
