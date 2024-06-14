import { Circle } from "./BlogCard"

export const BlogSkeleton = () => {
    return (
        <div role="status" className="animate-pulse">
            <div className="p-4 borderr-b border-slate-200 w-screen max-w-screen-lg cursor-pointer">
                <div className="flex">
                    <div className="h-6 w-6 bg-gray-200 rounded-full mb-4 mr-2"></div>
                    <div className="h-6 bg-gray-200 rounded-lg w-48 mb-4"></div>
                    <div className="flex justify-center flex-col pl-1"><Circle /></div>
                    <div className="h-6 bg-gray-200 rounded-lg w-36 mb-2.5 ml-2"></div>
                </div>
                <div className="text-3xl font-semibold">
                    <div className="h-10 bg-gray-200 rounded-md mb-2.5"></div>
                </div>
                <div className="text-xl mt-2 text-slate-700">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
                <div className="text-xl mt-2 text-slate-700">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
                <div className="text-slate-600 text-sm mt-2 font-light">
                    <div className="h-2 w-16 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
                <div className="bg-slate-100 shadow-md h-1 mt-4"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}