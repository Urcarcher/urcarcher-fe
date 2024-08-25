import React from 'react';
import 'assets/rateGraph.css';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

const data = [
        {
            name: "1",
            // uv: 4000,
            // pv: 2400,
            rOpen: "1436.40"
        },
        {
            name: "2",
            // uv: 3000,
            // pv: 1398,
            rOpen: "1536.40"
        },
        {
            name: "3",
            // uv: 2000,
            // pv: 9800,
            rOpen: "1036.40"
        },
        {
            name: "4",
            // uv: 2780,
            // pv: 3908,
            rOpen: "936.40"
        },
        {
            name: "5",
            // uv: 1890,
            // pv: 4800,
            rOpen: "1336.40"
        },
        {
            name: "6",
            // uv: 2390,
            // pv: 3800,
            rOpen: "1836.40"
        },
        {
            name: "7",
            // uv: 3490,
            // pv: 4300,
            rOpen: "1236.40"
        },
        {
            name: "8",
            rDate: "2024-08-24",
            rStart: "2024-08-21",
            rEnd: "2024-08-27",
            rOpen: "1336.40"
        },
        {
            name: "9",
            // uv: 3490,
            // pv: 4300,
            rOpen: "1336.40"
        },
        {
            name: "10",
            // uv: 3490,
            // pv: 4300,
            rOpen: "1036.40"
        },
        {
            name: "11",
            // uv: 3490,
            // pv: 4300,
            rOpen: "1536.40"
        },
        {
            name: "12",
            // uv: 3490,
            // pv: 4300,
            rOpen: "1936.40"
        }
    ];

const rate = [
    // 예측 날짜, 시가, 여행 추천 시작일, 여행 추천 종료일 (국가 별 예측 정보가 있다고 가정)
    { rDate: "2024-08-24", rOpen: "1336.40", rStart: "2024-08-21", rEnd: "2024-08-27", rNation: "USD" },
    { rDate: "2024-08-26", rOpen: "1330.30", rStart: "2024-08-22", rEnd: "2024-08-27", rNation: "USD" }
];

const CustomXAxisTick = ({ x, y, payload, onClick }) => {
    const handleClick = () => {
      if (onClick) {
        onClick(payload.value);  // payload.value를 onClick에 전달
      }
    };
  
    return (
      <text 
        x={x} 
        y={y + 10}  // 텍스트 위치를 조정하여 겹침 방지
        fill="#666" 
        textAnchor="middle" 
        onClick={handleClick} 
        style={{ cursor: 'pointer' }}>
        {payload.value}월
      </text>
    );
  };

function RateGraph({ showRateHandle }) {
    return (
        <div className="graph_wrapper">
            <LineChart className="lineChart_box" width={400} height={300} data={data}>
            <CartesianGrid className="cartesianGrid_box" strokeDasharray="3 3" />
            <XAxis 
                dataKey="name" 
                padding={{ left: 30, right: 30 }}
                tick={<CustomXAxisTick onClick={showRateHandle} />}
            />
            <YAxis
                domain={[1270, 'auto']}
                label={{ 
                    value: "환율 (USD/KRW/CNY)", 
                    angle: -90, 
                    position: 'insideLeft',
                    offset: 0,
                    dy: 40
                }} />
            <Tooltip />
            <Legend />
            <Line
                type="monotone"
                dataKey="rOpen"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="rOpen" stroke="#82ca9d" />
            </LineChart>
        </div>
    );
}

export default RateGraph;