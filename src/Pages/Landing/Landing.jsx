import Card from "../../components/Cards/Card";
import Categories from "../../components/Categories/Categories";
import Footer from "../../components/Footer/Footer";
import Home from "../../components/Home/Home";

const Landing = () => {
    return ( 
        <section>
            <Home/>
            
            <Categories/>
            <Footer/>
        </section>
     );
}
 
export default Landing;