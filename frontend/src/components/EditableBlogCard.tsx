import { Link, useNavigate } from "react-router-dom";
import { Avatar, Circle } from "./BlogCard";
import { useState } from "react";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
}

export const EditableBlogCard = ({ authorName, title, content, publishedDate, id }: BlogCardProps) => {
    const [click, setClick] = useState(false);
    const [firstname, lastname] = authorName.split(" ");
    const navigate = useNavigate()
    const formattedAuthorName = lastname ? `${firstname[0].toUpperCase() + firstname.slice(1)} ${lastname[0].toUpperCase() + lastname.slice(1)}` :
        `${firstname[0].toUpperCase() + firstname.slice(1)}`;
    const handleMenuClick = () => {
        setClick(prevClick => !prevClick);
    };

    const handleEditClick = () => {
        setClick(false);
        navigate(`/edit/${id}`);
    };

    return (
            <div className="p-4 w-screen max-w-screen-lg cursor-pointer">
                <div className="flex justify-between pb-2">
                    <div className="flex">
                        <div className="flex justify-center flex-col">
                            <Avatar name={authorName} />
                        </div>
                        <div className="pl-2">
                            {formattedAuthorName}
                        </div>
                        <div className="flex justify-center flex-col pl-1"><Circle /></div>
                        <div className="pl-2 font-thin text-slate-800">
                            {publishedDate}
                        </div>
                    </div>
                    <div className="flex">
                        <div onClick={handleMenuClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                            </svg>
                        </div>
                        <div className={`${click ? "absolute right-4 md:right-auto mt-6 flex justify-center flex-col rounded-lg border bg-gray-100 pl-2 text-lg font-light p-2" : "hidden"}`}>
                            <div onClick={handleEditClick} className="cursor-pointer">
                                Edit Blog
                            </div>
                        </div>
                    </div>
                </div>
                <Link to={`/blog/${id}`}>
                    <div className="text-3xl font-semibold">
                        {title}
                    </div>
                    <div className="text-xl mt-2 text-slate-700">
                        {content.slice(0, 100) + "..."}
                    </div>
                    <div className="text-slate-600 text-sm mt-2 font-light">
                        {`${Math.ceil(content.length / 100)} min read`}
                    </div>
                </Link>
                <div className="bg-slate-100 shadow-md h-1 mt-4"></div>
            </div>
    );
};

