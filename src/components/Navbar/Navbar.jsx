import logo from "../../assets/logo2.png"
import { NavLink, useParams, useNavigate } from "react-router";
import "./Navbar.css"
import { useContext } from "react";
import { SearchContext } from "../../Context/StoredContext";

const Navbar = () => {
    const {login, setLogin} = useContext(SearchContext)
    const navigate = useNavigate()
    const scrollToSection = (sectionId) => {
        navigate(`/home/?${userId}`);
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      };

    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('access_token')
    const NavItem = ({ to, children, onClick}) => (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                isActive ? "text-yellow-500 font-bold" : "text-white"
            }
        >
            {children}
        </NavLink>
    );

    const logout = ()=>{
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('token_exp');
        navigate("/");
    }

    return (
        <section className="navbar">
            <img src={logo} alt="logo" className="logo" />

            <div className="nav-links">
                <NavItem className="nav-link" to={`/home/${userId}`}>Home</NavItem>
                <NavItem className="nav-link" to="#" onClick={() => scrollToSection('footer')}>Contact</NavItem>
                <NavItem className="nav-link" to="#" onClick={() => scrollToSection('categories')}>Skills</NavItem>
                {userId ? (
                    <NavItem className="nav-link" to={`/dashboard/${userId}`}>Dashboard</NavItem>
                ) : ""}
            </div>

            {!token? <div><button onClick={()=>navigate("/register")} className="btn">Sign Up</button>
                    <button className="btn-1" onClick={()=>navigate("/")}>Login</button></div>
            : <button className="btn" onClick={logout}>Logout</button>

            }


        </section>
    );
}

export default Navbar;