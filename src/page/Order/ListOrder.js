import React, { useState } from "react";
import TableComponent from "../../components/Table/Table";
import { AiFillPrinter } from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import data from "./data";
const ListOrder = () => {
    const [expandedRow, setExpandedRow] = useState([]);

    const columns = [
        { key: "maPhieu", label: "Mã phiếu" },
        { key: "ngayBan", label: "Ngày bán" },
        { key: "nhanVien", label: "Nhân viên bán hàng" },
        { key: "khachHang", label: "Khách hàng" },
        { key: "trangThai", label: "Trạng thái", isFilterable: true },
        { key: "tongTien", label: "Tổng tiền" },
        {
            key: "button",
            label: "In",
            render: (row) => (
                <button onClick={() => handlePrint(row)} className="z-10 text-center mx-auto">
                    <AiFillPrinter className=" h-4 w-4"/>
                </button>
            ),
        },
    ];

    const handleRowClick = (index) => {
        if (expandedRow.includes(index)) {
            // Nếu hàng đã mở, loại bỏ nó khỏi mảng
            setExpandedRow(
                expandedRow.filter((rowIndex) => rowIndex !== index)
            );
        } else {
            // Nếu hàng chưa mở, thêm nó vào mảng
            setExpandedRow([...expandedRow, index]);
        }
    };
    const handleIsFilters = () => {
        setExpandedRow([]);
    };
    const handlePrint = (row) => {
        console.log("In đơn hàng:", row.maPhieu);
    };
    const handlePageChange = () => {
        setExpandedRow([]);
    };

    const renderExpandedRow = (row) => {
        return (
            <div className={`transition-all duration-300 ${
                expandedRow === null
                    ? "animate-fade-out"
                    : "animate-fade-in-down"
            }`}>
                <h3 className="font-bold mb-2">Chi tiết đơn hàng</h3>
                <div
                    className="flex gap-3"
                >
                    <table className="w-[75%] border-collapse">
                        <thead>
                            <tr className="border-b border-gray-400">
                                <th className="p-2">Tên sản phẩm</th>
                                <th className="p-2">Màu sắc</th>
                                <th className="p-2">Số lượng</th>
                                <th className="p-2">Đơn giá</th>
                                <th className="p-2">Giảm giá</th>
                                <th className="p-2">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {row.sanPham.map((item, idx) => (
                                <tr key={idx} className="text-center">
                                    <td className="p-2">{item.ten}</td>
                                    <td className="p-2">{item.mauSac}</td>
                                    <td className="p-2">{item.soLuong}</td>
                                    <td className="p-2">{item.donGia}</td>
                                    <td className="p-2">{item.giamgia}</td>
                                    <td className="p-2">{item.thanhTien}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="w-[25%] p-2">
                        <div className="flex gap-2 item-center">
                            <div>
                                {" "}
                                <MdAddCircleOutline className="w-6 h-6" />
                            </div>
                            <div>Tổng số lượng: {}</div>
                        </div>
                        <div className="flex gap-2 item-center my-3">
                            <div>
                                {" "}
                                <MdFormatListBulletedAdd className="w-6 h-6" />
                            </div>
                            <div>Tổng tiền: {row.tongTien}</div>
                        </div>
                        <div className="flex gap-2 item-center">
                            <div>
                                {" "}
                                <GiConfirmed className="w-6 h-6" />
                            </div>
                            <div className="flex gap-1">
                                Trạng thái: <div className="text-blue-700">{row.trangThai}</div>
                            </div>
                        </div>
                        {row.trangThai === "Đang chờ xác nhận" ||
                        row.trangThai === "Đang chờ vận chuyển" ||
                        row.trangThai === "Đang giao hàng" ? (
                            <div className="mt-3 flex justify-center">
                                <button
                                    type="button"
                                    class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                                >
                                    Xác nhận
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    };
    return (
        <>
            <TableComponent
                title="Đơn hàng"
                columns={columns}
                data={data}
                expandedRow={expandedRow}
                onRowClick={handleRowClick}
                onPageChange={handlePageChange}
                renderExpandedRow={renderExpandedRow}
                handleIsFilters={handleIsFilters}
            />
        </>
    );
};

export default ListOrder;
