import illustration1 from "../../assets/GirlLaptop.png"
import illustration2 from "../../assets/woman.png"
import "./Card.css"

const Card = () => {
    return (
        <section className="card-section">
            {/* Card 1 */}
            <div className="card">
                <h1>For Tutor</h1>
                <div className="description">
                    <p>Want to be become a tutor or upload a useful resource for learning? </p>
                    <img src={illustration1} alt="Tutor Illustration" className="card-img" />
                </div>

                <button className="upload-btn">Upload</button>
            </div>

            {/* Card 2 */}
            <div className="card">
                <h1>For Student</h1>
                <div className="description">
                    <p>Want to be become a tutor or upload a useful resource for learning? </p>
                    <img src={illustration2} alt="Student Illustration" className="card-img" />
                </div>

                <button className="upload-btn">Learn</button>
            </div>
        </section>
    );
}

export default Card;