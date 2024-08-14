import React from 'react';
import { Link } from 'react-router-dom'; // React Router의 Link 컴포넌트 추가
import '../../assets/CourseCard.css';

const CourseCard = ({ course }) => {
    return (
        <Link to={`/course/${course.courseId}`} className="course-card-link"> {/* Link로 코스 상세 페이지로 연결 */}
            <div className="course-card">
                <img src={course.imageUrl} alt={course.courseName} className="course-image" />
                <div className="course-info">
                    <p className="course-region">{course.region}</p>
                    <p className="course-name">{course.courseName}</p>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;