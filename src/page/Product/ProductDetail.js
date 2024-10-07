import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ProductReviews from "../../components/Product/ProductReviews";
import StarRating from "../../components/Product/StarRating";
import { useParams } from "react-router-dom";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";
import { TbListDetails } from "react-icons/tb";
import { MdOutlineEditNote } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    Table,
    Button,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Upload,
} from "antd";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "../Product/index.css";
const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};

const ProductDetail = () => {
    const id = 46;
    const [data, setData] = useState();
    const [rating, setRating] = useState();
    const sizeDefault = ["S", "M", "L", "XL", "2XL", "3XL"];

    const fetchRating = async () => {
        try {
            const req = await fetch(
                `http://localhost:8080/api/products/${id}/ratings`
            );
            const res = await req.json();
            if (res.succes) {
                const count = res.rating.count;
                const total = res.rating.totalStartPoint;
                setRating({
                    count: count,
                    point: count !== 0 ? (total / count).toFixed(2) : 0,
                });
            } else console.log("Không lấy được biến thể");
        } catch (error) {
            console.log("Error get variantproduct", error);
        }
    };
    const fetchAPI = async () => {
        try {
            const req = await fetch(`http://localhost:8080/api/products/${id}`);
            const res = await req.json();
            if (res.succes) {
                setData(res.product);
                console.log("res", res.product);
            } else {
                console.error("ProductDetail: failed");
            }
        } catch {
            console.error("Promise productdetail rejected");
        }
    };
    useEffect(() => {
        fetchAPI();
        // fetchRating()
    }, []);

    const checkSize = (variant) => {
        const check = variant.filter((item) => item.size.trim() !== "").length;
        return check ? true : false;
    };

    function ButtonNext(props) {
        const { onClick } = props;
        return (
            <HiArrowRight
                onClick={onClick}
                className="absolute right-7 top-[55%] text-[30px] text-black "
            />
        );
    }
    function ButtonPrev(props) {
        const { onClick } = props;
        return (
            <HiArrowLeft
                onClick={onClick}
                className="absolute right-7 top-[45%] z-10 text-[30px] text-gray-300 "
            />
        );
    }
    const settings = {
        customPaging: function (i) {
            return (
                <a>
                    <img src={`${JSON.parse(data.Image)[i]}`} alt="" />
                </a>
            );
        },
        appendDots: (dots) => (
            <div>
                <ul className="absolute left-[-50px] top-0 flex max-w-[40px] flex-col gap-2">
                    {" "}
                    {dots}{" "}
                </ul>
            </div>
        ),
        dots: true,
        dotsClass: "slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <ButtonNext />,
        prevArrow: <ButtonPrev />,
    };

    const handleRating = (value) => {
        setRating(value);
    };

    //
    const [form] = Form.useForm();
    const [need, setNeed] = useState();
    const [collection, setCollection] = useState();
    const [categorySub, setCategorySub] = useState();
    const [imageUrl, setImageUrl] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const fetchapi = async (type) => {
        const req = await fetch(`http://localhost:8080/api/${type}`);
        const res = await req.json();
        // console.log(res);
        return res;
    };
    useEffect(() => {
        const set = async () => {
            setNeed(await fetchapi("need"));
            setCollection(await fetchapi("collection"));
            setCategorySub(await fetchapi("categorysub"));
        };
        set();
    }, []);

    const charUpperCase = (sentence) => {
        sentence = sentence.toLowerCase();
        let words = sentence.split(" ");
        let capitalizedWords = words.map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1)
        );
        let capitalizedSentence = capitalizedWords.join(" ");
        return capitalizedSentence;
    };
    const onFinish = async (values) => {
        if (!imageUrl.length || imageUrl.length < 2) {
            toast.warning("Vui lòng chọn tối thiểu 2 ảnh", {
                autoClose: 1000,
            });
            console.log(imageUrl);
            return 0;
        }
        const product = {
            CategorySubId: values.CategorySubId,
            CollectionID: values.CollectionID,
            DescriptionProducts:
                values.DescriptionProducts.split("\n").join("\u005C\u005C"),
            Discount: values.Discount,
            NeedID: values.NeedID,
            Price: values.Price,
            NameProducts: charUpperCase(values.NameProducts),
            Image: imageUrl,
        };
        console.log("product", product);

        console.log("values", values);
        try {
            const req = await fetch(`http://localhost:8080/api/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });

            const res = await req.json();
            console.log(res);
            if (res.succes === true) {
                toast.success("Thêm sản phẩm thành công");
            } else toast.error("Tên sản phẩm đã tồn tại");
        } catch (error) {
            console.error("Error adding product:", error.message);
            throw error;
        }
        onReset();
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const onReset = () => {
        form.resetFields();
        setImageUrl([]);
    };
    const DeleteImg = (img) => {
        const image = imageUrl.filter((item) => item !== img);
        setImageUrl(image);
    };
    const handleBeforeUpload = async (file) => {
        const formData = new FormData();
        formData.append("images", file);

        // Gửi yêu cầu POST đến API
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:8080/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (data) setIsLoading(false);
            setImageUrl([...imageUrl, data[0]]);
        } catch (error) {
            console.error("Error uploading images:", error);
        }

        // Ngăn chặn quá trình tải lên mặc định của Upload
        return false;
    };
    return (
        <div className="bg-white rounded-xl shadow-2xl m-4 p-4">
            <div>
                {data && (
                    <>
                        <div className="flex gap-3 items-center justify-center mb-3">
                            <TbListDetails className="w-7 h-7" />
                            <div className="text-3xl text-gray-900 dark:text-white font-bold">
                                CHI TIẾT SẢN PHẨM
                            </div>
                        </div>

                        <div className="relative mx-auto flex pl-14 my-4">
                            <div className="w-[35%] top-5 sticky">
                                <Slider {...settings} className="w-full">
                                    {JSON.parse(data.Image).map((item) => {
                                        // console.log('img', item)
                                        return (
                                            <div key={item} className="w-full">
                                                <img
                                                    className="h-full w-full object-cover"
                                                    src={`${item}`}
                                                    alt=""
                                                />
                                            </div>
                                        );
                                    })}
                                </Slider>
                            </div>
                            <div className="w-[65%] px-8">
                                <div className="text-3xl font-bold">
                                    {data.NameProducts}
                                </div>
                                <div className="my-8 flex items-end gap-2">
                                    {rating && (
                                        <>
                                            {rating.count ? (
                                                <>
                                                    <div className="font-bold">
                                                        {rating.point}
                                                    </div>
                                                    <StarRating
                                                        className="text-4xl"
                                                        css="text-blue-800 w-5 h-5"
                                                        rating={rating.point}
                                                    />
                                                    <div>({rating.count})</div>
                                                </>
                                            ) : (
                                                <div className="italic mr-5">
                                                    Chưa có đánh giá
                                                </div>
                                            )}
                                        </>
                                    )}
                                    <div>
                                        | Đã bán (web): {data.QuantitySell}
                                    </div>
                                </div>
                                <div className="mb-5 flex gap-2 font-bold">
                                    <div className="text-2xl">
                                        {(
                                            data.Price -
                                            data.Price * data.Discount * 0.01
                                        ).toFixed()}
                                        .000đ
                                    </div>
                                    <div className="text-2xl text-gray-400">
                                        <del>{data.Price}.000đ</del>
                                    </div>
                                    <div className="text-xl text-red-600">
                                        -{data.Discount}%
                                    </div>
                                </div>

                                <div className="my-4">
                                    <div className="font-bold underline mb-4 text-lg">
                                        Số lượng trong kho:
                                    </div>
                                    <Table
                                        pagination={false}
                                        columns={
                                            checkSize(data.VariantProducts)
                                                ? [
                                                      {
                                                          title: "Màu/Size",
                                                          dataIndex: "color",
                                                          rowScope: "row",
                                                          key: "color",
                                                      },
                                                      ...sizeDefault.map(
                                                          (item) => ({
                                                              title: item,
                                                              dataIndex: item,
                                                              key: item,
                                                          })
                                                      ),
                                                  ]
                                                : [
                                                      {
                                                          title: "Màu",
                                                          dataIndex: "color",
                                                          rowScope: "row",
                                                          key: "color",
                                                      },
                                                      {
                                                          title: "Số lượng",
                                                          dataIndex: "quantity",
                                                          key: "quantity",
                                                      },
                                                  ]
                                        }
                                        dataSource={
                                            data &&
                                            (checkSize(data.VariantProducts)
                                                ? [
                                                      ...new Set(
                                                          data.VariantProducts.map(
                                                              (item) =>
                                                                  item.color
                                                          )
                                                      ),
                                                  ].map((item, index) => ({
                                                      key: index,
                                                      color: item,
                                                      ...sizeDefault.reduce(
                                                          (acc, i) => {
                                                              const variant =
                                                                  data.VariantProducts.filter(
                                                                      (a) =>
                                                                          a.color ===
                                                                              item &&
                                                                          a.size ===
                                                                              i
                                                                  );
                                                              acc[i] =
                                                                  variant.length
                                                                      ? variant[0]
                                                                            .quantity
                                                                      : "-";
                                                              return acc;
                                                          },
                                                          {}
                                                      ),
                                                  }))
                                                : data.VariantProducts.map(
                                                      (item, index) => ({
                                                          key: index,
                                                          color: item.color,
                                                          quantity:
                                                              item.quantity,
                                                      })
                                                  ))
                                        }
                                    />
                                </div>

                                <div className="border-t">
                                    <div className="py-4 font-bold">
                                        Đặc điểm nổi bật
                                    </div>
                                    <div>
                                        {data.DescriptionProducts.split(
                                            /\\\\/
                                        ).map((item, index) => (
                                            <div
                                                key={index}
                                                className="my-2 flex gap-3 italic"
                                            >
                                                <b>+</b>
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ProductReviews id={id} onHandleRating={handleRating} />
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setOpen(!open)}
                                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                            >
                                {open ? "Đóng" : "Chỉnh sửa"}
                            </button>
                        </div>
                    </>
                )}
            </div>
            {open && data && (
                <div className="flex gap-3 items-center justify-center my-4">
                    <MdOutlineEditNote className="w-7 h-7" />
                    <div className="text-3xl text-gray-900 dark:text-white font-bold">
                        CẬP NHẬT SẢN PHẨM
                    </div>
                </div>
            )}
            {open && data && (
                <Form
                    labelAlign="left"
                    form={form}
                    {...layout}
                    name="update-product"
                    initialValues={{
                        CategorySubId: data.CategorySubId,
                        CollectionID: data.Collections.map((item) => item.id),
                        DescriptionProducts: data.DescriptionProducts.replace(
                            /\\\\/g,
                            "\n"
                        ),
                        Discount: data.Discount,
                        NeedID: data.Needs.map((item) => item.id),
                        Price: data.Price,
                        NameProducts: data.NameProducts,
                        // Image: imageUrl
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="NameProducts"
                        label={
                            <span className="text-slate-600 text-base">
                                Tên sản phẩm
                            </span>
                        }
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="DescriptionProducts"
                        label={
                            <span className="text-slate-600 text-base">
                                Mô tả
                            </span>
                        }
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea rows={6} />
                    </Form.Item>

                    <Form.Item
                        label={
                            <span className="text-slate-600 text-base">
                                Giá
                            </span>
                        }
                        name="Price"
                        rules={[{ required: true }]}
                    >
                        <InputNumber
                            min={1}
                            max={1000}
                            style={{
                                width: "50%",
                            }}
                            suffix=".000 VNĐ"
                        />
                    </Form.Item>

                    <Form.Item
                        label={
                            <span className="text-slate-600 text-base">
                                Giảm giá
                            </span>
                        }
                        name="Discount"
                    >
                        <InputNumber
                            min={0}
                            max={100}
                            style={{
                                width: "50%",
                            }}
                            suffix="%"
                        />
                    </Form.Item>

                    {categorySub && categorySub.data && (
                        <Form.Item
                            name="CategorySubId"
                            label={
                                <span className="text-slate-600 text-base">
                                    Loại sản phẩm
                                </span>
                            }
                            rules={[{ required: true }]}
                        >
                            <Select placeholder="Chọn loại sản phẩm">
                                {categorySub.data.map((item, index) => {
                                    return (
                                        <Option key={index} value={item.id}>
                                            {item.Name}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                    )}

                    {need && need.needs && (
                        <Form.Item
                            label={
                                <span className="text-slate-600 text-base">
                                    Nhu cầu
                                </span>
                            }
                            name="NeedID"
                            rules={[{ required: true }]}
                        >
                            <Checkbox.Group className="w-full">
                                <Row>
                                    {need.needs.map((item, index) => {
                                        return (
                                            <Col span={6} key={index}>
                                                <Checkbox
                                                    value={item.id}
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    {item.NeedName}
                                                </Checkbox>
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>
                    )}

                    {collection && collection.collection && (
                        <Form.Item
                            label={
                                <span className="text-slate-600 text-base">
                                    Bộ sưu tập
                                </span>
                            }
                            name="CollectionID"
                            rules={[{ required: true }]}
                        >
                            <Checkbox.Group>
                                <Row>
                                    {collection.collection.map(
                                        (item, index) => {
                                            return (
                                                <Col span={8} key={index}>
                                                    <Checkbox
                                                        value={item.id}
                                                        style={{
                                                            lineHeight: "32px",
                                                        }}
                                                    >
                                                        {item.Name}
                                                    </Checkbox>
                                                </Col>
                                            );
                                        }
                                    )}
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>
                    )}

                    <Form.Item>
                        <Upload
                            beforeUpload={handleBeforeUpload}
                            showUploadList={false} // Ẩn danh sách tệp đã chọn
                        >
                            <Button
                                icon={<UploadOutlined />}
                                loading={isLoading}
                            >
                                Choose File
                            </Button>
                        </Upload>
                    </Form.Item>
                    {imageUrl && (
                        <div>
                            <p>Image URL:</p>
                            <div className="flex gap-4 my-4">
                                {imageUrl.map((item) => {
                                    return (
                                        <div
                                            key={item}
                                            className="w-[150px] h-[200px] relative"
                                        >
                                            <img
                                                src={item}
                                                alt="Uploaded"
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                            <div
                                                onClick={() => DeleteImg(item)}
                                                className="absolute top-0 right-1.5 cursor-pointer"
                                            >
                                                <CloseOutlined />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <Form.Item className="mb-0">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                            className="mr-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                            Cập nhật
                        </Button>
                        <Button className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default ProductDetail;
