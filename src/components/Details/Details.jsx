import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import './Details.css'


const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    const fetchCourseDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/course/courses/${id}`);
            setCourse(response.data);
            console.log('Course Data:', response.data);
        } catch (error) {
            console.error('Error fetching course details:', error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchCourseDetails();
    }, [id]);

    if (!course) {
        return <p>Loading course details...</p>;
    }

    return (
        <div className="course-detail-container">
            <div className='detail-1'>
                {course.image && <img src={course.image} alt="Course" className="course-image" />}
            </div>
            <div className='detail-2'>
                
                <h1>{course.course_name}</h1>
                <div className="course-section">
                    <h2>Description</h2>
                    <p>{course.description}</p>
                </div>

                <div className="course-section">
                    <h2>Overview</h2>
                    <p>{course.overview}</p>
                </div>

                {course.files && course.files.length > 0 ? (
                    <div className="course-section">
                        <h2>Course Files</h2>
                        <ul className='fileList'>
                            {course.files.map((file, index) => (
                                <li key={index} className='file-item'>
                                    <a href={file.file} download>Download File {index + 1}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="no-files">No files available for this course.</p>
                )}

                {course.external_link && (
                    <div className="course-section">
                        <h2>External Link</h2>
                        <p className="external-link-text">{course.external_link}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseDetail;





