// 경로에 따라 제목을 설정하는 함수 
export  const getTitle = (pathname) => {

    const cleanedPathname = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

    switch (cleanedPathname) { // => 추가 경로에 따라 제목 설정
        case '/maphome':
        case '/maphome/map':
        case '/maphome/categoryRank':
        case '/maphome/beststorelist':
            return '나만의 지도';
        case '/courseList': 
            return '여행 코스';
        case '/card1':
        case '/card2':
        case '/card3':
        case '/card4':
        case '/card5':
        case '/card6':
        case '/cardverification':
            return '카드 신청';
        case '/usage':
            return '카드 사용 내역';
        case '/chart1':
        case '/chart2':
            return '소비 리포트'; 
        case '/cardmanagement': 
            return 'My 카드'; 
        case '/exchange':  
        case '/exchange/currency':
        case '/exchange/success':
            return '환전';
        case '/exchange/card':
            return '카드 선택';
        case '/exchange/set':
            return '자동 환전';
        case '/exchange/history/card':
        case '/exchange/history':
        case '/exchange/history/detail':
            return '환전 내역';
        case '/reservation':
            return '예매';
        case '/searchtour': 
            return '관광지 및 맛집 추천';
        case '/MapComponent':  
            return '길 찾기';
        case '/signup':
        case '/signup/success':
        case '/signup/userinfo':
            return '회원가입';
        case '/login':
            return '로그인';
        default:
            return handleDynamicPaths(cleanedPathname); // 가변 경로 처리
    }
};
export  const handleDynamicPaths = (pathname) => {
    // /tourguide/:areaCode/:contentTypeId 패턴 => contentTypeId 12:관광지, 39:맛집 
    const tourGuideMatch = /^\/tourguide\/[^\/]+\/([^\/]+)$/.exec(pathname);
    if (tourGuideMatch) {
        const [, contentTypeId] = tourGuideMatch;
        return getTourGuideTitle(contentTypeId);
    }
    // /detail/:type/:id 패턴
    if (/^\/detail\/[^\/]+\/[^\/]+$/.test(pathname)) {
        return '상세 페이지';
    }
    // /course/:courseId 패턴
    if (/^\/course\/[^\/]+$/.test(pathname)) {
        return '여행 코스 상세';
    }
    // /MapComponent/:detailDestination 패턴
    if (/^\/MapComponent\/[^\/]+$/.test(pathname)) {
        return '길 찾기';
    }
    return '기타';
}

// :contentTypeId에 따라 제목을 반환하는 함수
export  const getTourGuideTitle = (contentTypeId) => {
    switch (contentTypeId) {
        case '12':
            return '관광지 추천';
        case '39':
            return '맛집 추천';
        default:
            return '관광지 및 맛집 추천';
    }
};