import { useContext, useState,useEffect } from "react";
import girl from "../../assets/Girl.png"
import "./Home.css"
import { SearchContext } from "../../Context/StoredContext";
import { useParams } from "react-router";
import axios from "axios";


const Home = () => {
    const { setSearchTerm } = useContext(SearchContext);
    const {userId} = useParams()
    const [userName, setUserName] = useState("")
    const {url, token} = useContext(SearchContext)
    

    useEffect(() => {
        const fetchUserName = async () => {
          try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`${url}api/users/profile/`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
    
            setUserName(response.data.first_name); // Assuming the API returns { "name": "John Doe" }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };

        
    
        if (userId) {
          fetchUserName();
          
        }
      }, [userId]);

    return ( 
        <section className="home">
            <div className="left-section">
                <h1>Learn And Share Anything From Anywhere, {userName} </h1>
                <div className="Search-bar">
                    <input 
                        type="text" 
                        placeholder="Search courses available" 
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="search">Search</button>
                </div>
                <p>Become a part of our ever-growing community and grow your network and knowledge base</p>
            </div>
            <div className="right-section">
                <img src={girl} alt="Illustration" />
            </div>
        </section>
     );
};

export default Home;