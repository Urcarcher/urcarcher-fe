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
    const [categoryStats, setCategoryStats] = useState([]);

    const categoryMapping = {
        "MT1": "생활편의",
        "CS2": "생활편의",
        "PK6": "생활편의",
        "OL7": "생활편의",
        "AD5": "생활편의",
        "PS3": "교육/문화",
        "SC4": "교육/문화",
        "AC5": "교육/문화",
        "CT1": "교육/문화",
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

    const filterDataByMonth = (month) => {
        const filtered = usage.filter(item => {
            const itemMonth = new Date(item.paymentDate).toISOString().split('T')[0].substring(0, 7);
            return itemMonth === month;
        });
        setFilteredUsage(filtered);
        generateChartData(filtered);
    };

    const generateChartData = (data) => {
        const categoryTotals = {};
        let totalAmount = 0;

        data.forEach(item => {
            const category = categoryMapping[item.category_code] || '기타';
            if (categoryTotals[category]) {
                categoryTotals[category] += item.paymentPrice;
            } else {
                categoryTotals[category] = item.paymentPrice;
            }
            totalAmount += item.paymentPrice;
        });

        const formattedChartData = [['Category', 'Amount']];
        const stats = [];

        for (const [category, amount] of Object.entries(categoryTotals)) {
            const percentage = Math.round((amount / totalAmount) * 100);  // 반올림하여 소숫점 제거
            formattedChartData.push([category, amount]);
            stats.push({ category, amount, percentage });
        }

        setChartData(formattedChartData);
        setCategoryStats(stats);
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

            {/* <div>
                {filteredUsage.length > 0 ? (
                    filteredUsage.map((usage, index) => (
                        <div key={index}>
                            <div>가맹점이름: {usage.store_name}</div>
                            <div>결제금액 : {usage.paymentPrice}</div>
                            <div>결제날짜 : {new Date(usage.paymentDate).toLocaleString()}</div>
                            <div>카테고리 코드: {usage.category_code}</div>
                            <p></p>
                            <br/>
                        </div>
                    ))
                ) : (
                    <div>선택된 월에 대한 결제 내역이 없습니다.</div>
                )}
            </div> */}

            <div>
                <h3>카테고리별 소비 비율 및 금액</h3>
                {categoryStats.length > 0 ? (
                    categoryStats.map((stat, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                            <div><strong>{stat.category}</strong></div>
                            <div>금액: {stat.amount.toLocaleString()}원</div>
                            <div>비율: {stat.percentage}%</div>
                        </div>
                    ))
                ) : (
                    <div>카테고리 정보가 없습니다.</div>
                )}
            </div>
        </div>
    );
};

export default MonthlyChart;
