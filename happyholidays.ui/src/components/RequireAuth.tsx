import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../services/hooks";
import { RootState } from "../services/store";

const RequireAuth = () => {
    const { isAuthenticated, token } = useAppSelector((state: RootState) => state.authSlice);
    const location = useLocation();
    return (
        token && isAuthenticated
            ? <Outlet />
            : <Navigate to={"login"} state={{ from: location }} replace />
    );
}

export default RequireAuth;