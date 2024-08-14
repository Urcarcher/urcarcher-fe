import React, { useEffect, useState } from 'react';

const memberId = "bleakwinter";

//테스트용
const topstorelist = [
    {name:"CGV 홍대"},
    {name:"CGV 홍대1"},
    {name:"CGV 홍대2"},
    {name:"CGV 홍대3"},
];

function StoreInfoList(props) {

    //테스트
    //전체 결제 내역 중 건수가 많은 가맹점 정보 저장 (아직 데이터 연결 X)
    const [topStore, setTopStore] = useState([]);
    
    //list가 한 개씩 나타나도록 setTimeout() 
    useEffect(() => {
        topstorelist.forEach((item, index) => {
            setTimeout(() => {
                setTopStore(prev => [...prev, item]);
            }, index * 700); // 각 아이템이 0.2초 간격으로 나타남
        });
    }, [topstorelist]);

   

     useEffect(() => {
         const axiosTopStores = async () => {
             try {
                //  const response = await axios.get(`/api/top-store?memberId=${memberId}`); //서버 주소 입력
                //  setTopStore(response.data);
             } catch (error) {
                 console.error('Error fetching top stores:', error);
             }
         };
 
         axiosTopStores();
     }, [memberId]);
  
    return (
        <div>
            가맹점 리스트
            <ul className='top-store-list inner'>
            {/* {topStore.map((store, index) => (
                <li key={store.store_name} className={`rank-${index + 1}`}>
                    <div>
                        <p>{index + 1}위: {store.store_name}</p>
                        <p>이용 횟수: {store.store_count}</p>
                    </div>
                </li>
            ))} */}
            {topstorelist.map((store, index) => (
                 <li key={index} className={topStore.includes(store) ? 'show' : ''}>
                    <div>
                        <p>{index + 1}위: {store.name}</p>
                        <p>이용 횟수: </p>
                    </div>
                </li>
            ))}
            </ul>
        </div>
    );
}

export default StoreInfoList;