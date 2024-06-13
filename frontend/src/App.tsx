import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Singup } from "./pages/Signup"
import { Singin } from "./pages/Signin"
import { Blog } from "./pages/Blog"
import { Blogs } from "./pages/Blogs"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Singup />}></Route>
          <Route path="/signin" element={<Singin />}></Route>
          <Route path="/blog/:id" element={<Blog />}></Route>
          <Route path="/blogs" element={<Blogs/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App