import { useState, useEffect } from 'react';
import axios from 'axios';

const useCourseList = () => {
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('https://urcarcher-local.kro.kr:8443/api/course/list')
            .then(response => {
                setCourses(response.data);
                console.log(response.data);
          
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    const handleRegionClick = (region) => {
        setSelectedRegion(region);
    };

    const regions = ['서울', '경기', '인천', '대전', '대구', '부산', '충청', '강원', '전라', '경상', '제주'];

    return {
        selectedRegion,
        courses,
        regions,
        handleRegionClick,
    };
};

export default useCourseList;
