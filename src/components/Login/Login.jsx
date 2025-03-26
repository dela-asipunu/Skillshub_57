import { SearchContext } from "../../Context/StoredContext"
import illustration1 from "../../assets/Brainstorm.png"
import apple from "../../assets/_Apple.png"
import facebook from "../../assets/_Facebook.png"
import google from "../../assets/google.png"
import "./Login.css"
import { useContext, useState } from "react"
import { useNavigate } from "react-router"

import axiosInstance from "../axiosInstance"


const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login, setLogin } = useContext(SearchContext);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('users/login/', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {

        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem('user_id', response.data.user_id);
        
        console.log("Login successful");

        const decodedToken = JSON.parse(atob(response.data.access.split('.')[1]));
        localStorage.setItem('token_exp', JSON.stringify({ exp: decodedToken.exp }));
        
        navigate(`/home/${response.data.user_id}`);
      }
    } catch (err) {
      setError(err?.response?.data?.detail || 'Invalid credentials. Please try again.')

    }
  };



  return (
    <section className="main-section">
      <div className="container1">
        <h1>Welcome Back</h1>
        <div className="content">
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" name="email" onChange={handleChange} value={data.email} required autoFocus />
            <input type="password" onChange={handleChange} placeholder="Password" name="password" required />
            <button type="submit" onClick={()=> setLogin(true)}>Login</button>
            <hr />
            <div className="socials">
              <img src={apple} alt="Apple login" />
              <img src={facebook} alt="Facebook login" />
              <img src={google} alt="Google login" />
            </div>
            <p>
              Don't have an account? <span onClick={() => navigate("/register")}>Sign up</span>
            </p>
          </form>
          <div className="illustration">
            <img src={illustration1} alt="image1" />
          </div>
        </div>

      </div>
    </section>
  );
}

export default Login;