import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return (
        <div className="border-b flex justify-between px-10 max-w-5xl w-full pb-5 pt-3">
            <div className="text-xl font-medium flex justify-center flex-col">
                Medium
            </div>
            <div>
                <Avatar name="Sourabh Poddar" 
                size="big" />
            </div>
        </div>
    )
}