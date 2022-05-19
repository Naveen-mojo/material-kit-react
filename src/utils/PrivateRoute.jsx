import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
    const {user} = useContext(AuthContext)
    return (
        <>
             {!user ? <Navigate to="login" /> : children }
        </>
    )
}

export default PrivateRoute;