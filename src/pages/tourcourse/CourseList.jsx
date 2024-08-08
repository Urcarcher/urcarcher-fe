import React, { useEffect, useState } from 'react';
import './RegionList.css';
import RegionList from './RegionList';
import RegionSelect from './RegionSelect';
import SortOptions from './SortOptions';
import CourseCard from './CourseCard';

const CourseList = () => {
    const { selectedRegion, courses, regions, handleRegionClick } = RegionSelect();
    const [sortOption, setSortOption] = useState('최신순');
    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        let filtered = courses;
        if (selectedRegion) {
            filtered = courses.filter(course => course.region === selectedRegion);
        }

        const sorted = filtered.sort((a, b) => {
            if (sortOption === '최신순') {
                return b.courseId.localeCompare(a.courseId);  // 최신순 정렬 (courseId가 문자열이므로 비교)
            } else if (sortOption === '조회순') {
                return b.views - a.views;  // 조회순 정렬 (조회수 데이터가 있다고 가정)
            } else if (sortOption === '인증순') {
                return b.certifications - a.certifications;  // 인증순 정렬 (인증 데이터가 있다고 가정)
            }
            return 0;
        });

        setFilteredCourses(sorted);
    }, [selectedRegion, sortOption, courses]);

    return (
        <div>
            <RegionList regions={regions} handleRegionClick={handleRegionClick} />
            <SortOptions setSortOption={setSortOption} />
            <div className="course-list">
                {filteredCourses.map(course => (
                    <CourseCard key={course.courseId} course={course} />
                ))}
            </div>
        </div>
    );
};

export default CourseList;