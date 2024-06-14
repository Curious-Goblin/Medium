import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useState } from "react";

export const Appbar = () => {
    const navigate = useNavigate();
    const [click, setClick] = useState(false);

    const handleAvatarClick = () => {
        setClick(prevClick => !prevClick);
    };

    const handleSignOutClick = () => {
        setClick(false);
        localStorage.removeItem('token');
        navigate('/signin');
    };

    return (
        <div className="border-b flex justify-between px-10 w-full pb-5 pt-3">
            <Link to={'/blogs'} className="flex justify-center flex-col">
                <div className="text-2xl font-medium cursor-pointer">
                    Medium
                </div>
            </Link>
            <div>
                <div className="flex">
                    <Link to={'/publish'}>
                        <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none 
                            focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center 
                            me-2 mb-2">New</button>
                    </Link>
                    <div onClick={handleAvatarClick}>
                        <Avatar name="Sourabh Poddar" size="big" />
                    </div>
                </div>
                <div className={`${click ? "border bg-gray-100 pl-2 text-lg font-medium mt-3 p-2" : "hidden"}`}>
                    <div onClick={handleSignOutClick}>
                        Sign out
                    </div>
                </div>
            </div>
        </div>
    );
};
