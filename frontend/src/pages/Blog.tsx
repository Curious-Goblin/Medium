import { useParams } from "react-router-dom"
import { FullBlog } from "../components/FullBlog"
import { useBlog } from "../hooks"
import { Appbar } from "../components/Appbar"
import { FullBlogSkeleton } from "../components/FullBlogSkeleton"
interface Blog {
    title: string,
    content: string,
    id?: string,
    author: {
        name: string
    }
}
export const Blog = () => {
    const { id } = useParams()
    const { loading, blog } = useBlog({
        id: id || ""
    })
    if (loading) {
        return <div>
            <Appbar/>
            <div>
                <div>
                    <FullBlogSkeleton />
                </div>
            </div>
        </div>
    }
    return (
        <FullBlog blog={blog} />
    )
}