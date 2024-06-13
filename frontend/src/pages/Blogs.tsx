import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs()
    if (loading) {
        return <div>
            loading...
        </div>
    }
    return (
        <div className="flex justify-center flex-col">
            <div className="flex justify-center">
                <Appbar />
            </div>
            <div className="flex justify-center pt-4">
                <div className="">
                    {blogs.map(blog => <BlogCard
                        authorName={blog.author.name}
                        title={blog.title}
                        content={blog.content}
                        id={blog.id||""}
                        publishedDate="12th June 2024"
                    />)}
                </div>
            </div>
        </div>
    );
};
