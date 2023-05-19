import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home/Home/Home";
import Main from "../layout/Main";
import Login from "../components/Login/Login/Login";
import SignUp from "../components/Login/SignUp/SignUp";
import Dashboard from "../components/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "signup",
                element: <SignUp></SignUp>
            },
            {
                path: "dashboard",
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            }
        ]
    }
]);

export default router;