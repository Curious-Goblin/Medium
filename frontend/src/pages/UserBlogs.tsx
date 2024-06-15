import { Appbar } from "../components/Appbar";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { EditableBlogCard } from "../components/EditableBlogCard";
import { useBlogUser } from "../hooks";

export const UserBlogs = () => {
    const { loading, blogs } = useBlogUser()
    if (loading) {
        return <div>
            <Appbar />
            <div className="flex justify-center pt-4">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }
    if (blogs[0] == null) {
        return (
            <div className="flex justify-center flex-col h-screen">
                <div className="flex justify-center">
                    <Appbar />
                </div>
                <div className="flex justify-center items-center flex-col h-full pt-4">
                    <div className="text-4xl font-extrabold">
                        You have not posted a Blog
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="flex justify-center flex-col">
            <div className="flex justify-center">
                <Appbar />
            </div>
            <div className="text-3xl font-bold flex justify-center pt-4 pb-4 underline">Your Blogs</div>
            <div className="flex justify-center pt-4">
                <div className="">
                    {blogs.map(blog => <EditableBlogCard
                        authorName={blog.author.name}
                        title={blog.title}
                        content={blog.content}
                        id={blog.id || ""}
                        publishedDate={blog.date}
                    />)}
                </div>
            </div>
        </div>
    );
};
