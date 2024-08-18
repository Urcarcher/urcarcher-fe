import axios from 'axios';
import React, { useEffect, useState } from 'react';

function UsageHistory(props) {
    const [usage, setUsage] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const today = new Date();
        return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}`;
    });
    const [filteredUsage, setFilteredUsage] = useState([]); // 필터링된 데이터를 저장할 상태 추가

    useEffect(() => {
        axios.get('/api/payment/list')
            .then(response => {
                console.log(response.data);
                setUsage(response.data);

                // 총금액 계산
                const total = response.data.reduce((acc, curr) => acc + curr.paymentPrice, 0);
                setTotalPrice(total);
            })
            .catch(error => {
                console.log('에러에러', error);
            });
    }, []);

    useEffect(() => {
        // 선택한 월의 데이터 필터링
        const filteredData = usage.filter(item => {
            const date = new Date(item.paymentDate);
            const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            return month === selectedMonth;
        });

        setFilteredUsage(filteredData); // 필터링된 데이터를 설정
    }, [selectedMonth, usage]);

    // 2024년 1월부터 현재 월까지의 옵션 생성
    const generateMonthOptions = () => {
        const options = [];
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        if (currentYear !== 2024) return options;
        const currentMonth = currentDate.getMonth() + 1;
        for (let month = currentMonth; month >= 1; month--) {
            const value = `2024-${month.toString().padStart(2, '0')}`;
            options.push(<option key={value} value={value}>2024년 {month}월</option>);
        }
        return options;
    };

    return (
        <div>
            <div>총 금액: {totalPrice.toLocaleString()}원</div> {/* 총금액 표시 */}
            <h4>{selectedMonth.replace('-', '년 ')}월</h4> {/* 선택한 년도와 월 표시 */}
            <div>
                <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                    {generateMonthOptions()}
                </select>
            </div>
            <div>
                {
                    filteredUsage.map((usage, index) => {
                        return (
                            <div key={index}>
                                <div>가맹점이름: {usage.store_name}</div>
                                <div>결제금액 : {usage.paymentPrice}</div>
                                <div>결제날짜 : {new Date(usage.paymentDate).toLocaleString()}</div>
                                <p></p>
                                <br/>
                            </div>
                        );
                    })
                }
                
            </div>
        </div>
    );
}

export default UsageHistory;
