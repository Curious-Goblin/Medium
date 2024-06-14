import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return (
        <div className="border-b flex justify-between px-10 w-full pb-5 pt-3">
            <Link to={'/blogs'}>
                <div className="text-xl font-medium flex justify-center flex-col cursor-pointer">
                    Medium
                </div>
            </Link>
            <div>
                <Link to={'/publish'}>
                    <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none 
            focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center 
            me-2 mb-2">New</button>
                </Link>
                <Avatar name="Sourabh Poddar"
                    size="big" />
            </div>
        </div>
    )
}