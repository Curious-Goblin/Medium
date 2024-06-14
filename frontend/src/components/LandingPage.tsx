import { useEffect, useState } from "react";
import { Blogs } from "../pages/Blogs";
import { Signup } from "../pages/Signup";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const LandingPage = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
                    headers: {
                        "Authorization": `${localStorage.getItem("token")}`
                    }
                });
                const signal = response.data.signal;
                setIsAuthenticated(signal);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user:', error);
                setLoading(false);
            }
        };
        fetchUser();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
    return isAuthenticated ? <Blogs /> : <Signup />
}