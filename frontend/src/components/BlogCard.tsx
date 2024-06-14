import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
}

export const BlogCard = ({ authorName, title, content, publishedDate, id }: BlogCardProps) => {
    const [firstname, lastname] = authorName.split(" ");
    const formattedAuthorName = lastname ?
        `${firstname[0].toUpperCase() + firstname.slice(1)} ${lastname[0].toUpperCase() + lastname.slice(1)}` :
        `${firstname[0].toUpperCase() + firstname.slice(1)}`;

    return (
        <Link to={`/blog/${id}`}>
            <div className="p-4 w-screen max-w-screen-lg cursor-pointer">
                <div className="flex pb-2">
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
                <div className="text-3xl font-semibold">
                    {title}
                </div>
                <div className="text-xl mt-2 text-slate-700">
                    {content.slice(0, 100) + "..."}
                </div>
                <div className="text-slate-600 text-sm mt-2 font-light">
                    {`${Math.ceil(content.length / 100)} min read`}
                </div>
                <div className="bg-slate-100 shadow-md h-1 mt-4"></div>
            </div>
        </Link>
    );
};

export function Circle() {
    return (
        <div className="flex justify-center flex-col h-1 w-1 rounded-full bg-black" />
    );
}

export function Avatar({ name, size = "small" }: { name: string, size?: string }) {
    const [firstname, lastname] = name.split(" ");
    return (
        <div className={`relative p-3 inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-black rounded-full`}>
            <span className={`${size === "small" ? "text-xs" : "text-md"} font-medium text-white`}>
                {lastname ? firstname[0].toUpperCase() + lastname[0].toUpperCase() : firstname[0].toUpperCase()}
            </span>
        </div>
    );
}
