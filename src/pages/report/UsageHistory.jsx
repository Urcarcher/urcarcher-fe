import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UsageHistory(props) {
    const [usage, setUsage] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [groupedUsage, setGroupedUsage] = useState({}); // 월별 데이터를 그룹화하여 저장할 상태

    const [name, setName] = useState('');
    const [memberId, setMemberId] = useState('');

    useEffect(() => {
        axios.get('/api/t/test')
            .then(response => {
                const memberData = response.data;
                setName(memberData.name);
                setMemberId(memberData.memberId);

                console.log('멤버아이디', memberId);

                // memberId를 사용하여 결제 데이터 가져오기
                axios.post('/api/payment/by-member', { memberId: memberData.memberId })
                    .then(paymentResponse => {
                        console.log('Payment data:', paymentResponse.data); // 로그 추가
                        const payments = paymentResponse.data;

                        // 총금액 계산
                        const total = payments.reduce((acc, curr) => acc + curr.paymentPrice, 0);
                        setTotalPrice(total);

                        // 월별로 데이터 그룹화
                        const groupedData = payments.reduce((acc, curr) => {
                            const date = new Date(curr.paymentDate);
                            const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

                            if (!acc[month]) {
                                acc[month] = [];
                            }
                            acc[month].push(curr);

                            return acc;
                        }, {});

                        // 각 월별 데이터 정렬 (최근 날짜 순)
                        Object.keys(groupedData).forEach(month => {
                            groupedData[month].sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate));
                        });

                        setGroupedUsage(groupedData);
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

    return (
        <div>
            <div  className="scrollable-content" style={{ maxHeight: '800px', overflowY: 'auto', padding: '10px', boxSizing: 'border-box' }}>
                <div style={{ marginTop: '100px', marginBottom: '100px'}}>
                    <div style={{ height: '150px', margin: '10px 20px', borderRadius: '10px', padding: '15px 20px',
                        boxShadow : '5px 5px 10px gray'
                    }}>
                        <h5 style={{ justifyContent: 'flex-start', display: 'flex', color: 'grey' }}>총 지출</h5>
                        <h2 style={{ justifyContent: 'flex-start', display: 'flex', color: '#064AFF' }}> {totalPrice.toLocaleString()}원</h2>
                    </div>

                    <div style={{ margin: '40px 20px' }}>
                    {
                        Object.keys(groupedUsage).sort((a, b) => new Date(b) - new Date(a)).map((month, index) => (
                            <div key={index}>
                                <h5 style={{ justifyContent: 'flex-start', display: 'flex' }}>{month.replace('-', '년 ')}월</h5> {/* 월별 헤더 */}
                                {groupedUsage[month].map((usage, idx) => (
                                    <div style={{ display: 'flex', margin: '25px auto', justifyContent: 'space-between', alignItems: 'center' }} key={idx}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            <img src={require('../../assets/Arrow2.png')} alt='' />
                                        </div>
                                        <div style={{ flex: 1, marginLeft: '20px' }}>  {/* flex: 1로 너비를 지정하여 가운데로 배치 */}
                                            <div style={{ fontWeight: 'bold', textAlign: 'start' }}>{usage.storeName} </div>
                                            <div style={{textAlign: 'start'}}>{new Date(usage.paymentDate).toLocaleString()}</div>
                                        </div>
                                        <div style={{ fontWeight: 'bold', color: '#064AFF' }}>{usage.paymentPrice}원</div>
                                    </div>
                                ))}
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UsageHistory;
