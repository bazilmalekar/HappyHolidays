import { Outlet } from "react-router-dom";

const AdminWrapper = () => {
    return(
        <div className="admin_wrapper">
            <h1>Wrapper</h1>
            <Outlet />
        </div>
    );
}

export default AdminWrapper;