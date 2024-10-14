import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Voucher = () => {
    const [data, setData] = useState();
    const fetchData = async () => {
        try {
            const req = await fetch(`http://localhost:4000/programs`);
            const res = await req.json();
            console.log(res);
            setData(res);
            // if (res.succes) {
            //     console.log("res.user", res.user);
            //     setUsers(res.user);
            //     console.log("setUsers", res.user)
            //     setSearched(true);
            // } else console.log(res.message);
        } catch (error) {
            console.log("Error get list use", error);
        }
    };
    const navigate = useNavigate();
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <div className="flex m-4 ">
                <div className="w-2/3 shadow-md mr-2 rounded-lg bg-white">
                    <table className="w-full text-sm text-left mx-auto mt-8">
                        <thead className="text-sm text-gray-700 dark:text-gray-400">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 bg-gray-100 dark:bg-gray-800"
                                >
                                    Tên chương trình
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 bg-gray-100 dark:bg-gray-800"
                                >
                                    Mã
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 bg-gray-100 dark:bg-gray-800"
                                >
                                    Trạng thái
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 bg-gray-100 dark:bg-gray-800"
                                >
                                    Số KM còn lại
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 bg-gray-100 dark:bg-gray-800"
                                >
                                    KM/Đơn hàng
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 bg-gray-100 dark:bg-gray-800"
                                >
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data ? (
                                data.map((data, i) => (
                                    <tr
                                        key={i}
                                        className="border-b border-gray-200 dark:border-gray-700"
                                    >
                                        <td className="px-6 py-2 bg-gray-50 dark:bg-gray-800">
                                            <div className="flex flex-col gap-1">
                                                <div className="text-blue-900 text-sm">{data.name}</div>
                                                <div className="text-xs italic">{data.startDate}{"-"}{data.endDate}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                            {data.code}
                                        </td>
                                        <td className="px-6 py-2 ">
                                            <div className={`${data.status === 'Hoạt động' ? 'bg-green-400' : (data.status === 'Ngừng' ? 'bg-gray-400' : 'bg-blue-300')} p-1 text-center rounded-2xl`}>
                                                 {data.status}
 
                                            </div>
                                        </td>
                                        <td className="px-6 py-2">
                                            {data.remainingKM}
                                        </td>
                                        <td className="px-6 py-2">
                                            {data.kmPerOrder}
                                        </td>

                                        <td className="px-6 py-2 text-center">
                                            <button
                                                type="button"
                                                class="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                            >
                                                <FaEdit />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="text-center py-4"
                                    >
                                        {/* <Spin size="large" /> */}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="w-1/3 shadow-md rounded-lg text-lg bg-white p-4">
                    <div className="flex gap-1 my-4">
                        <div className="font-bold">Tên CTKM:</div>
                        <div className="font-bold text-blue-900 italic">
                            {" "}
                            Trung thu copy
                        </div>
                    </div>
                    <div className="flex gap-1 my-4 flex-col">
                        <div className="font-bold">Hàng khuyến mãi</div>
                        <div className="italic text-base">
                            Giảm 10 (%) tất cả hàng hoá, khi mua SL từ: 2
                        </div>
                    </div>
                    <div className="flex gap-1 my-4 flex-col">
                        <div className="font-bold">Đối tượng áp dụng</div>
                        <div className="italic text-base">
                            (Cho tất cả khách hàng)
                        </div>
                    </div>
                    <div className="flex gap-1 my-4 flex-col">
                        <div className="font-bold">Đơn hàng đã áp dụng</div>
                        <div className="italic text-base">
                            (Chưa áp dụng cho đơn hàng nào)
                        </div>
                    </div>
                    <button className=" py-2.5 px-5 me-2 mb-2 mt-4 ml-auto flex justify-end text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Dừng khuyến mãi
                    </button>
                </div>
            </div>
        </>
    );
};

export default Voucher;
