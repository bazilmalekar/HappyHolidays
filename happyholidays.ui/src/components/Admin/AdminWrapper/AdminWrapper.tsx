import { Outlet } from "react-router-dom";

const AdminWrapper = () => {
    return (
        <div className="admin_wrapper">
            <Outlet />
        </div>
    );
}

export default AdminWrapper;