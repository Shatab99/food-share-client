import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({children}) => {

    const {user, loading}= useContext(AuthContext)

    if(loading){
        return <div className="flex justify-center my-16"><span className="loading loading-spinner text-neutral"></span></div>
    }

    if(user){
        return children;
    }

    return <Navigate state={location.pathname} to='/login'></Navigate>;
};

export default PrivateRoute;