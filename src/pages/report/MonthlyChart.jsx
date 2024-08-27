import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/WeeklyChart.css';

const MonthlyChart = () => {
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const today = new Date();
        return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}`;
    });
    const [usage, setUsage] = useState([]);
    const [chartData, setChartData] = useState([['Category', 'Amount']]);
    const [categoryStats, setCategoryStats] = useState([]);
    const [memberId, setMemberId] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

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
        "생활편의": require('../../assets/conv.png'),
        "교육/문화": require('../../assets/education.png'),
        "교통": require('../../assets/bus.png'),
        "금융/공공서비스": require('../../assets/etc.png'),
        "식비/건강": require('../../assets/food.png'),
        "관광/여가": require('../../assets/travel.png'),
    };

    useEffect(() => {
        axios.get('/api/t/test')
            .then(response => {
                const memberData = response.data;
                setMemberId(memberData.memberId);

                console.log('멤버아디', memberData.memberId);

                // memberId를 사용하여 결제 데이터 가져오기
                axios.post('/api/payment/by-member', { memberId: memberData.memberId })
                    .then(paymentResponse => {
                        console.log('Payment data:', paymentResponse.data); // 로그 추가
                        setUsage(paymentResponse.data);
                        filterDataByMonth(selectedMonth, paymentResponse.data); // 초기 데이터 필터링
                    })
                    .catch(paymentError => {
                        console.error('Error fetching payment data:', paymentError.response || paymentError.message);
                        // 에러 상태 처리
                    });
            })
            .catch(error => {
                console.error('Error fetching member data:', error);
                // 에러 상태 처리
            });
    }, []);

    useEffect(() => {
        if (usage.length > 0) {
            filterDataByMonth(selectedMonth, usage); // 선택된 달에 따라 데이터 필터링
        }
    }, [selectedMonth]);

    const filterDataByMonth = (month, data) => {
        const filtered = data.filter(item => {
            const itemMonth = new Date(item.paymentDate).toISOString().split('T')[0].substring(0, 7);
            return itemMonth === month;
        });
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
            const category = categoryMapping[item.categoryCode];
            if (category) {  // "기타" 카테고리 제외
                categoryTotals[category] += item.paymentPrice;
                totalAmount += item.paymentPrice;
            }
        });

        const formattedChartData = [['Category', 'Amount']];
        let stats = [];

        for (const [category, amount] of Object.entries(categoryTotals)) {
            const percentage = totalAmount > 0 ? Math.round((amount / totalAmount) * 100) : 0;
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

    const slices = categoryStats.map((stat, index) => ({
        color: categoryColors[stat.category] || categoryColors['기타']
    }));

    return (
        <div className="scrollable-content" style={{ maxHeight: '800px', overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>
            <div className="header-menu" >
                <div
                    className={`menu-item ${location.pathname === '/chart2' ? 'active' : ''}`}
                    onClick={() => navigate('/chart2')}
                >
                    소비 리포트
                </div>
                <div
                    className={`menu-item ${location.pathname === '/chart1' ? 'active' : ''}`}
                    onClick={() => navigate('/chart1')}
                >
                    소비 패턴 분석
                </div>
            </div>

            <div style={{ marginTop: '20px' }}>
                <div style={{ fontSize: '20px', justifyContent: 'flex-start', display: 'flex', marginLeft: '20px', fontWeight: 'bolder' }}>
                    <select
                        value={selectedMonth.split('-')[1]}
                        onChange={handleMonthChange}
                        style={{ border: 'none', outline: 'none', fontWeight: 'bold' }}
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
                            pieSliceText: 'percentage',
                            slices: slices
                        }}
                        width="480px"
                        height="350px"
                    // legendToggle
                    />
                </div>

                {categoryStats.length > 0 ? (
                    categoryStats.map((stat, index) => (
                        <div
                            key={index}
                            style={{
                                margin: index === 0 ? '0px 10px' : '25px 10px', // 첫 번째 요소에만 '0px 10px' 적용
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <img src={categoryImages[stat.category]} alt={stat.category} style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                            <div style={{ flex: 1, textAlign: 'left', fontWeight: 'bold' }}><strong>{stat.category}</strong></div>
                            <div style={{ fontWeight: 'bold', textAlign: 'right', marginLeft: 'auto' }}>{stat.amount.toLocaleString()}원&nbsp; | &nbsp; {stat.percentage}%</div>
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
