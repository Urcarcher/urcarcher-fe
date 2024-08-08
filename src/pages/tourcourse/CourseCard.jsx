import React from 'react';
import '../../assets/CourseCard.css';

const CourseCard = ({ course }) => {
    return (
        <div className="course-card">
            <img src={course.imageUrl} alt={course.courseName} className="course-image" />
            <div className="course-info">
                <p className="course-region">{course.region}</p>
                <p className="course-name">{course.courseName}</p>
            </div>
        </div>
    );
};

export default CourseCard;
