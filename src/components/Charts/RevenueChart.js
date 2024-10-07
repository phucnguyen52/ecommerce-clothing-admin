import React, { useState } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const RevenueChart = () => {
    
    const sampleData = [
        { productType: "Sản phẩm A", revenue: 12000 },
        { productType: "Sản phẩm B", revenue: 18000 },
        { productType: "Sản phẩm C", revenue: 8000 },
        { productType: "Sản phẩm D", revenue: 15000 },
        { productType: "Sản phẩm E", revenue: 22000 },
        { productType: "Sản phẩm F", revenue: 17000 },
        { productType: "Sản phẩm G", revenue: 30000 },
        { productType: "Sản phẩm H", revenue: 5000 },
        { productType: "Sản phẩm I", revenue: 9000 },
        { productType: "Sản phẩm J", revenue: 20000 },
    ];

    return (
        <div className="my-10 bg-white">
            {sampleData.length > 0 && (
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart className="focus:outline-none">
                        <Tooltip />
                        <Pie
                            data={sampleData}
                            dataKey="revenue"
                            nameKey="productType"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label
                        />
                    </PieChart>
                </ResponsiveContainer>
            )}
            <div className="mx-auto w-fit font-semibold text-base uppercase py-5">
                BIỂU ĐỒ DOANH THU TỔNG THỂ
            </div>
        </div>
    );
};

export default RevenueChart;
