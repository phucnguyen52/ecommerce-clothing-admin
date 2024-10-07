import React, { useEffect, useState } from "react";
import {
    apiGetPublicProvinces,
    apiGetPublicDistrict,
    apiGetPublicWard,
} from "../../services/ApiAddress";

import { FaWindowClose } from "react-icons/fa";
import Select from "./Select";
import InputReadOnly from "./InputReadOnly";
const ModalAdd = ({ title, handleCloseModalAddAddress }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [ward, setWard] = useState("");
    const [reset, setReset] = useState(false);
    const [numberAddress, setNumberAddress] = useState("");
    const [phone, setPhone] = useState("");
    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces();
            if (response.status === 200) {
                setProvinces(response?.data.results);
            }
        };
        fetchPublicProvince();
    }, []);
    useEffect(() => {
        setDistrict(null);
        const fetchPublicDistrict = async () => {
            const response = await apiGetPublicDistrict(province);
            if (response.status === 200) {
                setDistricts(response.data?.results);
            }
        };
        province && fetchPublicDistrict();
        !province ? setReset(true) : setReset(false);
        !province && setDistricts([]);
    }, [province]);
    useEffect(() => {
        setWard(null);
        const fetchPublicWard = async () => {
            const response = await apiGetPublicWard(district);
            if (response.status === 200) {
                setWards(response.data?.results);
            }
        };
        district && fetchPublicWard();
        !district ? setReset(true) : setReset(false);
        !district && setWards([]);
    }, [district]);
    return (
        <div>
            <button
                className="background-transparent absolute right-[22px] top-[18px] text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                type="button"
                onClick={handleCloseModalAddAddress}
            >
                <FaWindowClose className="h-8 w-8" />
            </button>
            <div className="flex items-start justify-between rounded-t border-b border-solid p-5">
                <h3 className="text-3xl font-semibold text-cyan-600">{title}</h3>
            </div>
            {/*body*/}
            <div>
                <div className="flex flex-col px-16 py-4">
                    <div className="mb-4">
                        <label className="font-medium" htmlFor="phone">
                            Tên nhà cung cấp
                        </label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            value={phone}
                            placeholder="Tên nhà cung cấp"
                            className="mt-2 w-full rounded-md border border-gray-300 p-2 outline-none"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="font-medium" htmlFor="phone">
                            Số điện thoại
                        </label>
                        <input
                            type="number"
                            name="phone"
                            id="phone"
                            value={phone}
                            placeholder="Số điện thoại"
                            className="mt-2 w-full rounded-md border border-gray-300 p-2 outline-none"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <Select
                                    type="province"
                                    value={province}
                                    setValue={setProvince}
                                    options={provinces}
                                    label="Tỉnh/Thành phố"
                                />
                                <Select
                                    reset={reset}
                                    type="district"
                                    value={district}
                                    setValue={setDistrict}
                                    options={districts}
                                    label="Quận/Huyện"
                                />
                                <Select
                                    reset={reset}
                                    type="ward"
                                    value={ward}
                                    setValue={setWard}
                                    options={wards}
                                    label="Phường/Xã"
                                />
                            </div>
                            <label className="font-medium" htmlFor="address">
                                Số nhà/Thôn/Xóm
                            </label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={numberAddress}
                                placeholder="Số nhà/Thôn/Xóm"
                                className="w-full rounded-md border border-gray-300 p-2 outline-none"
                                onChange={(e) =>
                                    setNumberAddress(e.target.value)
                                }
                            />
                            <InputReadOnly
                                label="Địa chỉ cụ thể"
                                value={`${
                                    numberAddress ? `${numberAddress}, ` : ""
                                }${
                                    ward
                                        ? `${
                                              wards?.find(
                                                  (item) =>
                                                      item.ward_id === ward
                                              )?.ward_name
                                          },`
                                        : ""
                                } ${
                                    district
                                        ? `${
                                              districts?.find(
                                                  (item) =>
                                                      item.district_id ===
                                                      district
                                              )?.district_name
                                          },`
                                        : ""
                                } ${
                                    province
                                        ? provinces?.find(
                                              (item) =>
                                                  item.province_id === province
                                          )?.province_name
                                        : ""
                                }`}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/*footer*/}
            <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
                <button
                    className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                    type="button"
                    // onClick={handleAddNewAddress}
                >
                    Thêm
                </button>
            </div>
        </div>
    );
};

export default ModalAdd;
