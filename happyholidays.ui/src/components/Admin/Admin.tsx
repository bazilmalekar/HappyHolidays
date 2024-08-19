import React from "react";
import AdminWrapper from "./AdminWrapper/AdminWrapper";
import SidebarComp from "./SidebarComp/SidebarComp";

const Admin: React.FC = () => {
    return (
        <section className="admin">
            <SidebarComp />
            <AdminWrapper />
        </section>
    );
}

export default Admin;