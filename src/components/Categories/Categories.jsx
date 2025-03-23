import { useContext } from "react";
import { SearchContext } from "../../Context/StoredContext";
import "./Categories.css"



const Categories = () => {
    const { filteredCourses } = useContext(SearchContext);

    return (
        <section className="categories" id="categories">
            {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                    <div key={course._id} className="card">
                        <img src={course.image} alt="course" className="card-img" />
                        <p className="card-text">{course.text}</p>
                        <p className="card-description">{course.description}</p>
                        <button className="cat-btn">{course.open}</button>
                    </div>
                ))
            ) : (
                <p>No courses found.</p>
            )}
        </section>
    );
};

export default Categories;