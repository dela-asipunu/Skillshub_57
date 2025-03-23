import { createContext, useState } from "react";
import { courses } from "../assets/asset"; // Import course data

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showDashboard, setShowDashboard] = useState(false)
    const url = "http://127.0.0.1:8000/";
    const [token, setToken] =useState("")



    // Filter courses based on search term
    const filteredCourses = courses.filter((course) =>
        course.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <SearchContext.Provider value={{token,setToken, searchTerm, showDashboard, setShowDashboard, setSearchTerm, filteredCourses, url }}>
            {children}
        </SearchContext.Provider>
    );
};
