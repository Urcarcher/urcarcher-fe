import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';

function UsageHistory(props) {
    const [usage, setUsage] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [groupedUsage, setGroupedUsage] = useState({}); // 월별 데이터를 그룹화하여 저장할 상태

    useEffect(() => {
        axios.get('/api/payment/list')
            .then(response => {
                console.log(response.data);
                setUsage(response.data);

                // 총금액 계산
                const total = response.data.reduce((acc, curr) => acc + curr.paymentPrice, 0);
                setTotalPrice(total);

                // 월별로 데이터 그룹화
                const groupedData = response.data.reduce((acc, curr) => {
                    const date = new Date(curr.paymentDate);
                    const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
                    
                    if (!acc[month]) {
                        acc[month] = [];
                    }
                    acc[month].push(curr);

                    return acc;
                }, {});

                setGroupedUsage(groupedData);
            })
            .catch(error => {
                console.log('에러에러', error);
            });
    }, []);

    return (
        <div>
            <div>총 금액: {totalPrice.toLocaleString()}원</div> {/* 총금액 표시 */}
            <div>
                {
                    Object.keys(groupedUsage).sort((a, b) => new Date(b) - new Date(a)).map((month, index) => (
                        <div key={index}>
                            <h4>{month.replace('-', '년 ')}월</h4> {/* 월별 헤더 */}
                            {groupedUsage[month].map((usage, idx) => (
                                <div key={idx}>
                                    <div>가맹점이름: {usage.store_name}</div>
                                    <div>결제금액 : {usage.paymentPrice}</div>
                                    <div>결제날짜 : {new Date(usage.paymentDate).toLocaleString()}</div>
                                    <p></p>
                                    <br />
                                </div>
                            ))}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default UsageHistory;
