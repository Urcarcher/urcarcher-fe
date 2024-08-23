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
        "BK9": "금융/공공서비스",
        "AG2": "금융/공공서비스",
        "PO3": "금융/공공서비스",
        "FD6": "식비/건강",
        "CE7": "식비/건강",
        "HP8": "식비/건강",
        "PM9": "식비/건강",
        "AT4": "관광/여가"
    };

    const categoryColors = {
        "생활편의": "#80B2FF",
        "교육/문화": "#FF80EB",
        "교통": "#FFCC80",
        "금융/공공서비스": "#FF808F",
        "식비/건강": "#80FF94",
        "관광/여가": "#FF99CC",
    };

    const categoryImages = {
        "생활편의": require('../../assets/fork.png'),
        "교육/문화": require('../../assets/fork.png'),
        "교통": require('../../assets/fork.png'),
        "금융/공공서비스": require('../../assets/fork.png'),
        "식비/건강": require('../../assets/fork.png'),
        "관광/여가": require('../../assets/fork.png'),
        "기타": require('../../assets/fork.png') // 기타 카테고리에 대한 이미지
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

        // 모든 카테고리를 0으로 초기화
        Object.keys(categoryMapping).forEach((code) => {
            const category = categoryMapping[code];
            if (!categoryTotals[category]) {
                categoryTotals[category] = 0;
            }
        });

        // 실제 데이터를 반영하여 금액을 집계
        data.forEach(item => {
            const category = categoryMapping[item.categoryCode] || '기타';
            categoryTotals[category] += item.paymentPrice;
            totalAmount += item.paymentPrice;
        });

        const formattedChartData = [['Category', 'Amount']];
        let stats = [];

        for (const [category, amount] of Object.entries(categoryTotals)) {
            const percentage = totalAmount > 0 ? Math.round((amount / totalAmount) * 100) : 0;  // 반올림하여 소숫점 제거
            formattedChartData.push([category, amount]);
            stats.push({ category, amount, percentage });
        }

        // 퍼센트 높은 순서대로 정렬
        stats.sort((a, b) => b.percentage - a.percentage);

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
            options.push(<option key={value} value={value}>{month}월</option>);
        }
        return options;
    };

    // slices 옵션 생성
    const slices = categoryStats.map((stat, index) => ({
        color: categoryColors[stat.category] || categoryColors['기타']
    }));

    return (
        <div  className="scrollable-content" style={{ maxHeight: '800px', overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>
        <div style={{ marginTop: '100px', marginBottom: '150px'}}>
            <div style={{fontSize: '20px', justifyContent: 'flex-start', display: 'flex', marginLeft: '20px', fontWeight: 'bolder'}}>
                <select 
                    value={selectedMonth.split('-')[1]} 
                    onChange={handleMonthChange}
                    style={{ border: 'none', outline: 'none' }} // 테두리와 아웃라인 제거
                >
                    {generateMonthOptions()}
                </select>
                &nbsp;소비 패턴 분석
            </div>

            <div className="chart-container">
                <Chart
                    chartType="PieChart"
                    data={chartData}
                    options={{
                        pieHole: 0.4,
                        tooltip: { text: 'percentage' },
                        pieSliceText: 'percentage',  // 퍼센트 표시
                        slices: slices // 카테고리별 색상 적용
                    }}
                    width="480px"
                    height="350px"
                    legendToggle
                />
            </div>

            <div style={{position: 'absolute', top: '420px', width: '100%'}}>
                {categoryStats.length > 0 ? (
                    categoryStats.map((stat, index) => (
                        <div key={index} style={{ margin: '30px 20px', display: 'flex', justifyContent: 'space-between'}}>
                            <img src={categoryImages[stat.category] || categoryImages['기타']} alt={stat.category} style={{ width: '40px', height: '40px' }} />
                            <div style={{position: 'absolute', left: '20%', textAlign: 'center'}}><strong>{stat.category}</strong></div>
                            <div style={{fontWeight: 'bold'}}>{stat.amount.toLocaleString()}원&nbsp; | &nbsp; {stat.percentage}%</div>
                        </div>
                    ))
                ) : (
                    <div>카테고리 정보가 없습니다.</div>
                )}
            </div>
        </div>
        </div>
    );
};

export default MonthlyChart;
