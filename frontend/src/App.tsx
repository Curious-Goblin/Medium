import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Singin } from "./pages/Signin"
import { Blog } from "./pages/Blog"
import { Blogs } from "./pages/Blogs"
import { Publish } from "./pages/Publish"
import { LandingPage } from "./components/LandingPage"
import { UserBlogs } from "./pages/UserBlogs"
import { Edit } from "./pages/Edit"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LandingPage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Singin />}></Route>
          <Route path="/blog/:id" element={<Blog />}></Route>
          <Route path="/blogs" element={<Blogs/>}></Route>
          <Route path="/publish" element={<Publish/>}></Route>
          <Route path="/edit/:id" element={<Edit/>}></Route>
          <Route path="/your-blogs" element={<UserBlogs/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App