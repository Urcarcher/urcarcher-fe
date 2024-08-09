import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

const MonthlyChart = () => {
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const today = new Date();
        return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}`;
    });
    const [usage, setUsage] = useState([]);
    const [filteredUsage, setFilteredUsage] = useState([]);
    const [chartData, setChartData] = useState([['Category', 'Amount']]);

    const categoryMapping = {
        "MT1": "생활편의",
        "CS2": "생활편의",
        "PK6": "생활편의",
        "OL7": "생활편의",
        "AD5": "생활편의",
        "PS3": "교육 및 문화",
        "SC4": "교육 및 문화",
        "AC5": "교육 및 문화",
        "CT1": "교육 및 문화",
        "SW8": "교통",
        "BK9": "금융 및 공공서비스",
        "AG2": "금융 및 공공서비스",
        "PO3": "금융 및 공공서비스",
        "FD6": "식비/건강",
        "CE7": "식비/건강",
        "HP8": "식비/건강",
        "PM9": "식비/건강",
        "AT4": "관광/여가"
    };

    useEffect(() => {
        axios.get('/api/payment/list')
            .then(response => {
                console.log('Original Data:', response.data);
                setUsage(response.data);
            })
            .catch(error => {
                console.log('Error fetching data', error);
            });
    }, []);

    useEffect(() => {
        if (usage.length > 0) {
            filterDataByMonth(selectedMonth);
        }
    }, [selectedMonth, usage]);

    useEffect(() => {
        updateChartData(filteredUsage);
    }, [filteredUsage]);

    const filterDataByMonth = (month) => {
        const filteredData = usage.filter(item => {
            const date = new Date(item.paymentDate);
            const itemMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            console.log(`Filtering: itemMonth=${itemMonth}, selectedMonth=${month}`);
            return itemMonth === month;
        });
        console.log('Filtered Data:', filteredData);
        setFilteredUsage(filteredData);
    };

    const updateChartData = (data) => {
        const categoryTotals = data.reduce((acc, curr) => {
            const categoryCode = curr.categoryCode.trim().toUpperCase(); // 공백 제거 및 대문자로 변환
            const category = categoryMapping[categoryCode];
            console.log(`Processing item with categoryCode=${categoryCode}, mapped category=${category}`);
            if (category) {
                if (!acc[category]) {
                    acc[category] = 0;
                }
                acc[category] += Math.abs(curr.paymentPrice); // 절대값으로 변환
            } else {
                console.log(`Category code ${categoryCode} is not defined in categoryMapping`);
            }
            return acc;
        }, {});

        console.log('Grouped Data:', categoryTotals);

        // 객체를 배열로 변환하여 차트 데이터에 사용
        const groupedData = Object.entries(categoryTotals).map(([category, total]) => [category, total]);
        console.log('Chart Data:', groupedData);

        // 기본 데이터 구조에 맞추어 반환
        setChartData([['Category', 'Amount'], ...groupedData]);
    };

    const handleMonthChange = (event) => {
        const month = event.target.value;
        const today = new Date();
        const yearMonth = `${today.getFullYear()}-${month}`;
        setSelectedMonth(yearMonth);
    };

    const generateMonthOptions = () => {
        const options = [];
        for (let month = 1; month <= 12; month++) {
            const value = month.toString().padStart(2, '0');
            options.push(<option key={value} value={value}>{value}월</option>);
        }
        return options;
    };

    return (
        <div>
            <div>
                <label>월 선택: </label>
                <select value={selectedMonth.split('-')[1]} onChange={handleMonthChange}>
                    {generateMonthOptions()}
                </select>
            </div>

            <div className="chart-container">
                <Chart
                    chartType="PieChart"
                    data={chartData}
                    options={{
                        title: `${selectedMonth.replace('-', '년 ')} 소비패턴 분석`,
                        pieHole: 0.4,
                        tooltip: { text: 'percentage' },
                        pieSliceText: 'percentage',  // 퍼센트 표시
                    }}
                    width="500px"
                    height="500px"
                    legendToggle
                />
            </div>

            <div>
                {filteredUsage.length > 0 ? (
                    filteredUsage.map((usage, index) => (
                        <div key={index}>
                            <div>가맹점이름: {usage.storeName}</div>
                            <div>결제금액 : {usage.paymentPrice}</div>
                            <div>결제날짜 : {new Date(usage.paymentDate).toLocaleString()}</div>
                            <div>카테고리 코드: {usage.categoryCode}</div>
                            <p></p>
                            <br/>
                        </div>
                    ))
                ) : (
                    <div>선택된 월에 대한 결제 내역이 없습니다.</div>
                )}
            </div>
        </div>
    );
};

export default MonthlyChart;
