import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({ allowedRoles }) {
    // destructuring the isLoggedIn and role from the redux state
    const { isLoggedIn, role } = useSelector((state) => state.auth);
    //
    return isLoggedIn && allowedRoles.find((myRole) => myRole == role) ? (
        <Outlet/>
    ) : isLoggedIn ? ( <Navigate to="/denied"/>) : (<Navigate to="login" />)
}

export default RequireAuth;