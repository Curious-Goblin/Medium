import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
interface Blog {
    title: string,
    content: string,
    id?: string,
    author: {
        name: string
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<Blog>()
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token" || "")
            }
        })
            .then(response => {
                console.log("hii")
                setBlog(response.data.blog);
                console.log(response.data.blog)
                setLoading(false)
            })
        console.log("lalksjdflajslf")
    }, [id])
    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog[]>([])
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blog);
                setLoading(false)
            })
    }, [])
    return {
        loading, blogs
    }
}