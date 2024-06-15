import { ChangeEvent, useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate, useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { EditSkeleton } from "../components/EditSkeleton"

export const Edit = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { loading, blog } = useBlog({
        id: id || ""
    })
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    useEffect(() => {
        if (blog) {
            setTitle(blog.title || "");
            setContent(blog.content || "");
        }
    }, [blog]);

    if (loading) {
        return (
            <div>
                <Appbar />
                <div>
                    <EditSkeleton/>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Appbar />
            <div className="flex justify-center pt-5 w-full">
                <div className="max-w-screen-lg w-full px-5">
                    <input type="text" className="w-full mb-2 focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm
                    rounded-lg p-2.5" placeholder="Title" value={title} onChange={(e) => {
                            setTitle(e.target.value)
                        }} />
                    <TextEditor onChange={(e) => {
                        setContent(e.target.value)
                    }} content={content || " "} />
                    <button type="submit" onClick={async () => {
                        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,
                            {
                                title, content
                            },
                            {
                                headers: {
                                    "Authorization": localStorage.getItem("token") || ""
                                }
                            })
                        navigate(`/blog/${response.data.id}`)
                    }} className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white
                                  bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                        Update Post
                    </button>
                </div>
            </div>
        </div>
    )
}

function TextEditor({ onChange, content }: {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
    content: string
}) {

    return <form>
        <div className="w-full mb-4">
            <div className="flex items-center justify-between">
                <div className="py-2 bg-white border rounded-lg w-full">
                    <label className="sr-only">Publish Post</label>
                    <textarea id="editor" value={content} onChange={onChange} rows={8} className="block w-full px-0 text-sm text-gray-800 bg-white focus:outline-none pl-2"
                        placeholder="Write an article..." required />
                </div>
            </div>
        </div>

    </form>
}