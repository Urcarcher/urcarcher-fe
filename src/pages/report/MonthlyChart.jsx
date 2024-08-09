import React from 'react';
import { Chart } from 'react-google-charts';

const MonthlyChart = () => {
    const data = [
        ['Task', 'Hours per Day'],
        ['식비/건강', 11],
        ['금융/공공서비스', 2],
        ['교통', 2],
        ['생활편의', 2],
        ['교육/문화', 7],
        ['관광/여가', 7]
    ];

    const total = data.slice(1).reduce((acc, curr) => acc + curr[1], 0);
    const percentages = data.slice(1).map(row => ({
        name: row[0],
        value: row[1],
        percentage: Math.round((row[1] / total) * 100)
    }));

    // 퍼센트가 높은 순서대로 정렬
    const sortedPercentages = [...percentages].sort((a, b) => b.percentage - a.percentage);

    // 가장 높은 퍼센트를 가진 카테고리 찾기
    const highestCategory = percentages.reduce((max, item) => item.percentage > max.percentage ? item : max, percentages[0]);


    const options = {
        title: '9월 소비패턴 분석',
        pieHole: 0.4,
        slices: {
            0: { color: '#80B2FF' },
            1: { color: '#FF80EB' },
            2: { color: '#FFCC80' },
            3: { color: '#FF808F' },
            4: { color: '#80FF94' },
            5: { color: '#FFD700' }
        },
        tooltip: {
            text: 'percentage'
        },
        pieSliceText: 'none'
    };

    return (
        <div>
            <div className="chart-container">
                <div>
                    <Chart
                        chartType="PieChart"
                        data={data}
                        options={options}
                        width="500px"
                        height="500px"
                        legendToggle
                    />
                </div>

                <div>
                    {sortedPercentages.map((item, index) => (
                        <div key={index}>
                            <div style={{ color: options.slices[index].color, fontWeight: 'bold' }}>{item.name}:</div> {item.percentage}%
                        </div>
                    ))}
                </div>
                <div>가장 지출 많은 카테고리 :  {highestCategory.name}</div>
            </div> 
        </div>
    );
};

export default MonthlyChart;
