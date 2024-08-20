import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'assets/Map.css';

function MyMapHome(props) { //시작 페이지

    const navigator = new useNavigate();

    //로그인한 회원 이름 저장
    const [memberId, setMemberId] = useState('bleakwinter');  // 테스트할 회원 ID
    //const [name, setName] = useState('');

    //  useEffect(() => {
    //      // "bleakwinter" 회원의 데이터를 가져오는 API 호출
    //      axios.get('/api/members/bleakwinter')// 로그인된 id로 나중에 수정하기
    //          .then(response => {
    //             const memberData = response.data;
    //              setMemberId(memberData.memberId);
    //              setName(memberData.name);
    //          })
    //          .catch(error => {
    //              console.error('Error fetching member data:', error);
    //          });
    //  }, []);

    //버튼 클릭이벤트 - 페이지 이동 (결제 내역 null 조건 추가하기)
    const goRankPage = () => {
        navigator("/maphome/categoryRank");
    }
    return (
        <div>
            {/* <Header /> */}
            <div className='mymaphome-wrap contents'>
                <div className='maphome-content inner'>
                    <div className='maphome_textwrap'>
                        <p>결제 내역으로 그린</p>
                        <p>나만의 지도</p>
                    </div>
                    <div>
                        <img src='/icon/map-main-img.png' alt="지도이미지" />
                    </div>
                </div>
                <div className='maphome-btn inner'>
                    <span>{memberId}님의 결제 내역으로 장소를 추천합니다</span>
                    <button onClick={goRankPage}>시작하기</button>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default MyMapHome;