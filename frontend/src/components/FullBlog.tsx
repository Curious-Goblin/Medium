import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

interface Blog {
    title: string,
    content: string,
    id?: string,
    author: {
        name: string
    }
}

export const FullBlog = ({ blog }: { blog: Blog | undefined }) => {
    return (
        <div>
            <Appbar />
            <div className="flex justify-center pt-12">
                <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl">
                    <div className="col-span-8">
                        <div className="text-4xl font-extrabold">
                            {blog == undefined ? "" : blog.title}
                        </div>
                        <div className="text-slate-400 pt-2">
                            Posted on 12th Jan, 2024
                        </div>
                        <div className="text-lg pt-4 font-light text-slate-600">
                            {blog == undefined ? "" : blog.content}
                        </div>
                    </div>
                    <div className="col-span-4 pl-16">
                        <div className="text-xl text-slate-800 font-semibold">
                            Author
                        </div>
                        <div className="flex pt-6">
                            <div className="flex justify-center flex-col">
                                <Avatar name={blog == undefined ? "" : blog.author.name}
                                    size="big" />
                            </div>
                            <div className="pl-4 ">
                                <div className="text-3xl font-bold">
                                    {blog == undefined ? "" : blog.author.name}
                                </div>
                                <div className="text-lg pt-2 font-light text-gray-600">
                                    Random catch about the author's ability to grab user's attention
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
