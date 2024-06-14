import { ChangeEvent, useState } from "react"
import { Appbar } from "../components/Appbar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate()

    return (
        <div>
            <Appbar />
            <div className="flex justify-center pt-5 w-full">
                <div className="max-w-screen-lg w-full">
                    <input type="text" className="w-full mb-2 focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm
                    rounded-lg p-2.5" placeholder="Title" onChange={(e) => {
                            setTitle(e.target.value)
                        }} />
                    <TextEditor onChange={(e) => {
                        setContent(e.target.value)
                    }} />
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
                        Publish Post
                    </button>
                </div>
            </div>
        </div>
    )
}

function TextEditor({ onChange }: {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}) {

    return <form>
        <div className="w-full mb-4">
            <div className="flex items-center justify-between">
                <div className="py-2 bg-white border rounded-lg w-full">
                    <label className="sr-only">Publish Post</label>
                    <textarea id="editor" onChange={onChange} rows={8} className="block w-full px-0 text-sm text-gray-800 bg-white focus:outline-none pl-2"
                        placeholder="Write an article..." required />
                </div>
            </div>
        </div>

    </form>
}