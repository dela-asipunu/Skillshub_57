import logo from "../../assets/logo.png"
import { NavLink, useParams, useNavigate } from "react-router";
import "./Navbar.css"

const Navbar = () => {
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

    return (
        <section className="navbar">
            <img src={logo} alt="logo" className="logo" />

            <div className="nav-links">
                <NavItem className="nav-link" to="">Home</NavItem>
                <NavItem className="nav-link" to="#" onClick={() => scrollToSection('footer')}>Contact</NavItem>
                <NavItem className="nav-link" to="#" onClick={() => scrollToSection('categories')}>Skills</NavItem>
                {userId ? (
                    <NavItem className="nav-link" to={`/dashboard/${userId}`}>Dashboard</NavItem>
                ) : ""}
            </div>

            <div>
                <button className="btn">Login</button>

            </div>


        </section>
    );
}

export default Navbar;