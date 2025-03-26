import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../../Context/StoredContext";
import "./Categories.css"
import axios from "axios";
import { useNavigate } from 'react-router'
import illustration1 from "../../assets/GirlLaptop.png"
import { motion } from 'framer-motion'

const Categories = () => {
    const { filteredCourses, login } = useContext(SearchContext);
    const [courses, setCourses] = useState([]);

    const navigate = useNavigate();


    const getAllCourses = async () => {

        try {
            const response = await axios.get('http://localhost:8000/api/course/courses'
            );
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error.response ? error.response.data : error.message);

        }

    };
    useEffect(() => {
        getAllCourses(); // Call the function on component mount
    }, []);
    const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.6 }
    })
  };

    return (
        <section className="categories" id="categories">
            <h1>Explore all available course to find your perfect match</h1>
            <motion.div
                initial={{ x: -150, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="extract">
                <img src={illustration1} alt="illustration" />
                <p> Explore all your latest courses here on skillshub. Register or sign now
                    and get the opportunity to share your resources with your colleagues by uploading a course, view course overview, download
                    resources, and get links to external resources. LEARN NOW </p>
            </motion.div>
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="all-courses">
                {courses.length > 0 ? (
                    courses.map((course, index) => (
                        <motion.div key={course.id} className="card"
                            variants={cardVariants}
                            custom={index}>
                            <img src={course.image} alt="course" className="card-img" />
                            <p className="card-text">{course.course_name}</p>
                            <p className="card-description">{course.description}</p>
                            <button className="cat-btn" onClick={ login ? () => navigate(`/course/${course.id}`): ()=> 
                            navigate("/")}>view skills</button>
                        </motion.div>
                    ))
                ) : (
                    <p>No courses found.</p>
                )}
            </motion.section>
        </section>
    );
};

export default Categories;