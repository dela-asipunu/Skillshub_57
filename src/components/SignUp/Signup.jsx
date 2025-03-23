import { useContext, useState } from "react";
import illlustration5 from "../../assets/Brainstorming.png";
import Stepper from "../Stepper/Stepper";
import "./Signup.css"
import axios from "axios";
import { SearchContext } from "../../Context/StoredContext";
import { useNavigate } from "react-router";


const Signup = () => {
    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        
        password: "",
        
    });



    const { url } = useContext(SearchContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(`${url}api/users/register/`, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.data.success) {
            console.log(response.data);
            setData({
              first_name: '',
              last_name: '',
              email: '',
              password: '',
            });
            navigate("/home")
          }
        } catch (error) {
          console.log("Error occurred:", error?.response?.data || error);
        }
      };
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
        console.log(data);
        
    };

    const steps = [
        <div className="info-section">
            <h1>Let's get Started</h1>
            <form className="form1">
                <div className="div-1">
                    <div>
                        <label htmlFor="first_name">First name</label>
                        <input type="text" name="first_name" id="first_name" onChange={onChangeHandler} value={data.first_name} />
                    </div>
                    <div>
                        <label htmlFor="last_name">Last name</label>
                        <input type="text" name="last_name" id="last_name" onChange={onChangeHandler} value={data.last_name} />
                    </div>
                </div>
                <div className="div-2">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" onChange={onChangeHandler} value={data.email} />
                </div>
                <div className="div-3">
                    <label htmlFor="location">Country of Residence</label>
                    <input type="text" id="location" name="location" onChange={onChangeHandler} value={data.location} />
                </div>
                <div className="div-5">
                    <label htmlFor="bio">Bio</label>
                    <textarea onChange={onChangeHandler} value={data.bio} name="bio" placeholder="Briefly describe yourself and interest" id="bio"></textarea>
                </div>
                <div className="div-4">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={onChangeHandler} value={data.password} />
                </div>
            </form>
        </div>,
        <div className="interest">
            <h1>Select your interests</h1>
            <div className="interest-options">
                <label htmlFor="web-design">
                    <input type="checkbox" id="web-design" name="interests" value="Web Design" />
                    <span>Web Design</span>
                </label>
                <label htmlFor="ethical-hacking">
                    <input type="checkbox" id="ethical-hacking" name="interests" value="Ethical Hacking" />
                    <span>Ethical Hacking</span>
                </label>
                <label htmlFor="finance">
                    <input type="checkbox" id="finance" name="interests" value="Finance" />
                    <span>Finance</span>
                </label>
                <label htmlFor="mobile-app">
                    <input type="checkbox" id="mobile-app" name="interests" value="Mobile App Development" />
                    <span>Mobile App Development</span>
                </label>
                <label htmlFor="networking">
                    <input type="checkbox" id="networking" name="interests" value="Networking" />
                    <span>Networking</span>
                </label>
                <label htmlFor="uiux">
                    <input type="checkbox" id="uiux" name="interests" value="UI/UX Design" />
                    <span>UI/UX Design</span>
                </label>
                <label htmlFor="backend">
                    <input type="checkbox" id="backend" name="interests" value="Backend Development" />
                    <span>Backend Development</span>
                </label>
            </div>
        </div>

    ];

    return (
        <section className="sign-up">
            <div className="image-section">
                <img src={illlustration5} alt="Sign-up Illustration" />
            </div>
            <Stepper steps={steps} submit={handleSubmit} />
        </section>
    );
};

export default Signup;
