import React, { useEffect, useState } from "react";
import TableComponent from "../../components/Table/Table";
import { AiFillPrinter } from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import axios from "axios";
const ListOrder = () => {
    const [expandedRow, setExpandedRow] = useState([]);

    const columns = [
        { key: "order_id", label: "Mã đơn hàng" },
        { key: "orderDate", label: "Ngày bán" },
        { key: "customer_name", label: "Khách hàng" },
        { key: "statusOrder", label: "Trạng thái", isFilterable: true },
        { key: "total_amount", label: "Tổng tiền" },
        {
            key: "button",
            label: "In",
            render: (row) => (
                <button
                    onClick={() => handlePrint(row)}
                    className="z-10 text-center mx-auto"
                >
                    <AiFillPrinter className=" h-4 w-4" />
                </button>
            ),
        },
    ];
    const today = new Date().toISOString().split("T")[0];
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const defaultStartDate = sevenDaysAgo.toISOString().split("T")[0];
    const [startDate, setStartDate] = useState(defaultStartDate); 
    const [endDate, setEndDate] = useState(today);
    const [data, setData] = useState([]);

    // Hàm fetch dữ liệu
    const fetchData = async (startDate, endDate) => {
        if (startDate && endDate) {
            console.log(startDate);
            console.log(endDate);
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/admin/order?start='${startDate}'&end='${endDate}'`,
                    {
                        withCredentials: true,
                    }
                );

                if (response.status === 200) {
                    setData(response.data.order);
                    console.log("dữ liệu", response.data.order);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };
    useEffect(() => {
        fetchData(startDate, endDate);
    }, [startDate, endDate]);
    const handleDateChange = (newStartDate, newEndDate) => {
        
        setStartDate(newStartDate);
        setEndDate(newEndDate);
    };
    const handleRowClick = (index) => {
        if (expandedRow.includes(index)) {
            setExpandedRow(
                expandedRow.filter((rowIndex) => rowIndex !== index)
            );
        } else {
            setExpandedRow([...expandedRow, index]);
        }
    };

    const handleIsFilters = () => {
        setExpandedRow([]);
    };
    const handlePrint = (row) => {};
    const handlePageChange = () => {
        setExpandedRow([]);
    };

    const renderExpandedRow = (row) => {
        // return (
        //     <div
        //         className={`transition-all duration-300 ${
        //             expandedRow === null
        //                 ? "animate-fade-out"
        //                 : "animate-fade-in-down"
        //         }`}
        //     >
        //         <h3 className="font-bold mb-2">Chi tiết đơn hàng</h3>
        //         <div className="flex gap-3">
        //             <table className="w-[75%] border-collapse">
        //                 <thead>
        //                     <tr className="border-b border-gray-400">
        //                         <th className="p-2">Tên sản phẩm</th>
        //                         <th className="p-2">Màu sắc</th>
        //                         <th className="p-2">Số lượng</th>
        //                         <th className="p-2">Đơn giá</th>
        //                         <th className="p-2">Giảm giá</th>
        //                         <th className="p-2">Thành tiền</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     {row.sanPham.map((item, idx) => (
        //                         <tr key={idx} className="text-center">
        //                             <td className="p-2">{item.ten}</td>
        //                             <td className="p-2">{item.mauSac}</td>
        //                             <td className="p-2">{item.soLuong}</td>
        //                             <td className="p-2">{item.donGia}</td>
        //                             <td className="p-2">{item.giamgia}</td>
        //                             <td className="p-2">{item.thanhTien}</td>
        //                         </tr>
        //                     ))}
        //                 </tbody>
        //             </table>
        //             <div className="w-[25%] p-2">
        //                 <div className="flex gap-2 item-center">
        //                     <div>
        //                         {" "}
        //                         <MdAddCircleOutline className="w-6 h-6" />
        //                     </div>
        //                     <div>Tổng số lượng: {}</div>
        //                 </div>
        //                 <div className="flex gap-2 item-center my-3">
        //                     <div>
        //                         {" "}
        //                         <MdFormatListBulletedAdd className="w-6 h-6" />
        //                     </div>
        //                     <div>Tổng tiền: {row.tongTien}</div>
        //                 </div>
        //                 <div className="flex gap-2 item-center">
        //                     <div>
        //                         {" "}
        //                         <GiConfirmed className="w-6 h-6" />
        //                     </div>
        //                     <div className="flex gap-1">
        //                         Trạng thái:{" "}
        //                         <div className="text-blue-700">
        //                             {row.trangThai}
        //                         </div>
        //                     </div>
        //                 </div>
        //                 {row.trangThai === "Đang chờ xác nhận" ||
        //                 row.trangThai === "Đang chờ vận chuyển" ||
        //                 row.trangThai === "Đang giao hàng" ? (
        //                     <div className="mt-3 flex justify-center">
        //                         <button
        //                             type="button"
        //                             class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        //                         >
        //                             Xác nhận
        //                         </button>
        //                     </div>
        //                 ) : null}
        //             </div>
        //         </div>
        //     </div>
        // );
    };
    
    return (
        <>
            <TableComponent
                title="Đơn hàng"
                labelFilter="Lọc"
                handleFetch={fetchData}
                columns={columns}
                data={data}
               
                expandedRow={expandedRow}
                onRowClick={handleRowClick}
                onPageChange={handlePageChange}
                renderExpandedRow={renderExpandedRow}
                handleIsFilters={handleIsFilters}
                startDate={startDate}
                endDate={endDate}
                onDateChange={handleDateChange}
            />
        </>
    );
};

export default ListOrder;
