import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupType } from "@curious-goblin/medium-blogging-website-common"
import axios from "axios"
import { BACKEND_URL } from "../config"
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupType>({
        name: "",
        email: "",
        password: ""
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs)
            const { token } = response.data
            localStorage.setItem("token", token)
            navigate("/blogs")
        } catch (e) {
            alert(e)
            console.log(e);
        }
    }

    return (
        <div className="flex justify-center h-screen flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-xl md:text-4xl font-extrabold flex justify-center">
                            {type === "signup" ? "Create an Account" : "Sign in to your Account"}
                        </div>
                        <div className="text-slate-400 text-center font-normal text-sm md:text-xl mt-4">
                            {type === "signup" ? "Already have an account ?" : "Don't have an Account"}
                            <Link className="pl-2 underline" to={type === "signup" ? "/signin" : "/signup"}>{type === "signup" ? "Sign in" : "Sign up"}</Link>
                        </div>
                    </div>
                    <div className="pt-10">
                        <div className={type === "signup" ? "block" : "hidden"}>
                            <LabelledInput label="Username" placeholder="Curious-Goblin.." onChange={(e) => {
                                setPostInputs({
                                    ...postInputs,
                                    name: e.target.value
                                })
                            }} />
                        </div>
                        <LabelledInput label="Email" placeholder="name@gmail.com" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                email: e.target.value
                            })
                        }} />
                        <LabelledInput label="Password" type="password" placeholder="abra_ka_dabra" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                password: e.target.value
                            })
                        }} />
                        <button onClick={sendRequest} type="button" className=" mt-6 w-full text-white bg-gray-800 hover:bg-gray-900 
                            focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg
                            text-sm px-5 py-2.5 me-2 mb-2">{type === "signup" ? "Sign up" : "Sign in"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface LabelledInputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type?: string
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div className="mt-4 w-full">
            <label className="block mb-2 text-md text-black font-semibold text-gray-900">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name"
                className="w-full min-w-32 mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                block p-2.5 focus:outline-none" placeholder={placeholder} required />
        </div>
    )
}