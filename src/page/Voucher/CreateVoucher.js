import React, { useState } from "react";

const CreateVoucher = () => {
    const [data, setData] = useState("");
    const [value, setValue] = useState(0);
    const [isChecked, setIsChecked] = useState(true);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    const handleInputChange = (e) => {
        const newValue = e.target.value;

        // Kiểm tra nếu giá trị trống thì đặt lại là 0
        if (newValue === "" || isNaN(newValue)) {
            setValue(0);
        } else {
            setValue(parseInt(newValue, 10));
        }
    };
    const handleRadioChange = (event) => {
        console.log(event.target.value); // Xử lý giá trị được chọn
    };

    return (
        <>
            <div className="flex p-5 gap-3">
                <div className="w-[35%] shadow-md mr-2 rounded-lg bg-white p-6 flex flex-col gap-4">
                    <div className="text-base font-bold">
                        Thông tin khuyến mãi
                    </div>
                    <div>
                        <div className="flex gap-4">
                            <div class="relative w-[70%]">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    autocomplete="off"
                                    class="rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100 dark:bg-gray-700 border-0 border-b-[1px] border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-b-2 peer"
                                    placeholder="Nhập tên chương trình KM"
                                />
                                <label
                                    for="name"
                                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-5 bg-gray-100 pr-16 z-10 origin-[0] start-2.5 peer-focus:pr-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Tên chương trình KM
                                </label>
                            </div>
                            <div class="relative w-[30%]">
                                <input
                                    type="text"
                                    name="voucher"
                                    id="voucher"
                                    autocomplete="off"
                                    class="rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100 dark:bg-gray-700 border-0 border-b-[1px] border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-b-2 peer"
                                    placeholder="Nhập mã KM"
                                />
                                <label
                                    for="voucher"
                                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-5 bg-gray-100 pr-12 z-10 origin-[0] start-2.5 peer-focus:pr-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Mã KM
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="relative w-[40%]">
                        <input
                            type="date"
                            name="dayStart"
                            id="dayStart"
                            class="rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100 dark:bg-gray-700 border-0 border-b-[1px] border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-b-2 peer"
                            placeholder=" "
                        />
                        <label
                            for="dayStart"
                            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-5 bg-gray-100 px-2 z-10 origin-[0] start-2.5 peer-focus:px-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                            Từ ngày
                        </label>
                    </div>

                    <div class="relative w-[40%]">
                        <input
                            type="date"
                            name="dayStart"
                            id="dayStart"
                            class="rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100 dark:bg-gray-700 border-0 border-b-[1px] border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-b-2 peer"
                            placeholder=" "
                        />
                        <label
                            for="dayStart"
                            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-5 bg-gray-100 px-2 z-10 origin-[0] start-2.5 peer-focus:px-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                            Từ ngày
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 py-4">
                            <input
                                id="min"
                                type="checkbox"
                                value=""
                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                onChange={handleCheckboxChange}
                            />
                            <label
                                htmlFor="min"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Giới hạn số phiếu
                            </label>
                        </div>

                        {isChecked && (
                            <div className="relative w-[50%]">
                                <input
                                    type="number"
                                    value={value}
                                    min="0"
                                    name="voucher"
                                    id="voucher"
                                    autoComplete="off"
                                    className="no-arrows text-right rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100 dark:bg-gray-700 border-0 border-b-[1px] border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-b-2 peer"
                                    placeholder="Nhập mã KM"
                                    onChange={handleInputChange}
                                />
                                <label
                                    htmlFor="voucher"
                                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-5 bg-gray-100 pr-12 z-10 origin-[0] start-2.5 peer-focus:pr-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Mã KM
                                </label>
                            </div>
                        )}
                    </div>
                    <div class="relative w-full">
                        <textarea
                            name="note"
                            id="note"
                            autocomplete="off"
                            rows="2"
                            class="resize-none rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100 dark:bg-gray-700 border-0 border-b-[1px] border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-b-2 peer"
                            placeholder="Ghi chú"
                        ></textarea>
                        <label
                            for="note"
                            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-5 bg-gray-100 pr-12 z-10 origin-[0] start-2.5 peer-focus:pr-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >
                            Ghi chú
                        </label>
                    </div>

                    <div className="flex items-center gap-3 py-4 justify-between">
                        <label
                            htmlFor="object"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Đối tượng khách hàng áp dụng
                        </label>
                        <div className="flex items-center">
                            <input
                                id="object"
                                type="checkbox"
                                value=""
                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                // onChange={handleCheckboxChange}
                            />
                            <label
                                htmlFor="object"
                                className="ms-2 text-sm text-gray-900 dark:text-gray-300"
                            >
                                Tất cả
                            </label>
                        </div>
                    </div>
                    <div className="py-4">
                        <div className="flex flex-row justify-between items-center">
                            <div className="ms-2 text-sm italic text-gray-900 dark:text-gray-300">
                                Chọn khách hàng áp dụng KM này
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="min"
                                    type="checkbox"
                                    value=""
                                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    onChange={handleCheckboxChange}
                                />
                                <label
                                    htmlFor="min"
                                    className="ms-2 text-sm text-gray-900 dark:text-gray-300"
                                >
                                    KM cho KH cụ thể
                                </label>
                            </div>
                        </div>

                        <div class="mt-5 bg-white shadow-md flex px-4 py-3 border-b border-gray-500 focus-within:border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 192.904 192.904"
                                width="18px"
                                class="fill-gray-600 mr-3"
                            >
                                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                            </svg>
                            <input
                                type="email"
                                placeholder="Nhập tên, mã hoặc SĐT khách hàng để tìm kiếm..."
                                class="w-full outline-none text-sm"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-[65%] shadow-md mr-2 rounded-lg bg-white p-6 flex flex-col gap-4 h-min">
                    <div className="flex justify-between items-center">
                        <div className="text-base font-bold">
                            Hàng hóa được khuyến mãi
                        </div>
                        <div className="flex items-center">
                            <input
                                id="object"
                                type="checkbox"
                                value=""
                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                // onChange={handleCheckboxChange}
                            />
                            <label
                                htmlFor="object"
                                className="ms-2 text-sm text-black dark:text-gray-300"
                            >
                                Tất cả
                            </label>
                        </div>
                    </div>
                    {isChecked ? (
                        <div className="flex justify-around py-3">
                            <div className="relative min-w-[30%]">
                                <input
                                    type="number"
                                    value={value}
                                    min="0"
                                    name="voucher"
                                    id="voucher"
                                    autoComplete="off"
                                    className="no-arrows text-right rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100 dark:bg-gray-700 border-0 border-b-[1px] border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-b-2 peer"
                                    placeholder="Sỗ lượng tối thiểu"
                                    onChange={handleInputChange}
                                />
                                <label
                                    htmlFor="voucher"
                                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-5 bg-gray-100 pr-12 z-10 origin-[0] start-2.5 peer-focus:pr-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Số lượng tối thiểu
                                </label>
                            </div>
                            <div className="relative min-w-[30%">
                                <input
                                    type="number"
                                    value={value}
                                    min="0"
                                    name="voucher"
                                    id="voucher"
                                    autoComplete="off"
                                    className="no-arrows text-right rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100 dark:bg-gray-700 border-0 border-b-[1px] border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-b-2 peer"
                                    placeholder="Giảm giá"
                                    onChange={handleInputChange}
                                />
                                <label
                                    htmlFor="voucher"
                                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-5 bg-gray-100 pr-12 z-10 origin-[0] start-2.5 peer-focus:pr-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Giảm giá
                                </label>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center">
                                    <input
                                        id="specificCustomer"
                                        type="radio"
                                        name="customerType"
                                        value="specific"
                                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        onChange={handleRadioChange}
                                    />
                                    <label
                                        htmlFor="specificCustomer"
                                        className="ms-2 text-sm text-gray-900 dark:text-gray-300"
                                    >
                                        %
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="allCustomers"
                                        type="radio"
                                        name="customerType"
                                        value="all"
                                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        onChange={handleRadioChange}
                                    />
                                    <label
                                        htmlFor="allCustomers"
                                        className="ms-2 text-sm text-gray-900 dark:text-gray-300"
                                    >
                                        VNĐ
                                    </label>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div>
                                <div className="italic">
                                    Chọn loại hàng / hàng hoá khuyến mãi
                                </div>
                                <div className="flex gap-4 py-7 items-center justify-around">
                                    <div className="flex items-center">
                                        <input
                                            id="object"
                                            type="checkbox"
                                            value=""
                                            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            // onChange={handleCheckboxChange}
                                        />
                                        <label
                                            htmlFor="object"
                                            className="ms-2 text-sm text-black dark:text-gray-300"
                                        >
                                            KM theo loại hàng
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="object"
                                            type="checkbox"
                                            value=""
                                            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            // onChange={handleCheckboxChange}
                                        />
                                        <label
                                            htmlFor="object"
                                            className="ms-2 text-sm text-black dark:text-gray-300"
                                        >
                                            KM hàng hóa cụ thể
                                        </label>
                                    </div>
                                </div>

                                {1 === 1 ? (
                                    <div class="block w-[25%] mx-auto mb-5">
                                        <label
                                            for="countries"
                                            class="block mb-2 text-sm font-medium text-gray-600 w-full"
                                        >
                                            Loại hàng
                                        </label>
                                        <select
                                            id="countries"
                                            class="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
                                        >
                                            <option selected>
                                                Chọn loại hàng
                                            </option>
                                            <option value="US">
                                                United States
                                            </option>
                                            <option value="CA">Canada</option>
                                            <option value="FR">France</option>
                                            <option value="DE">Germany</option>
                                        </select>
                                    </div>
                                ) : (
                                    ""
                                )}
                                {1 === 1 ? (
                                    <div>
                                        <div className="italic text-base text-blue-400">Chọn hàng hoá KM</div>
                                        <div class="w-full bg-white mt-2 shadow-md flex px-4 py-3 border-b border-gray-500 focus-within:border-blue-500 overflow-hidden mx-auto font-[sans-serif]">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 192.904 192.904"
                                                width="18px"
                                                class="fill-gray-600 mr-3"
                                            >
                                                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                                            </svg>
                                            <input
                                                type="email"
                                                placeholder="Nhập tên, mã hoặc SĐT khách hàng để tìm kiếm..."
                                                class="w-full outline-none text-sm"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CreateVoucher;
