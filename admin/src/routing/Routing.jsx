import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import Login from "../components/auth/login"


export const Routing = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/login"} element={<Login />} />
        </Routes>
    )
}
