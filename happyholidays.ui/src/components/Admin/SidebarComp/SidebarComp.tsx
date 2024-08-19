import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const SidebarComp = () => {
    return (
        <Sidebar>
            <Menu>
                <MenuItem component={<Link to="/admin" />}> Packages </MenuItem>
                <MenuItem component={<Link to="/admin/create-package" />} > Create Packages </MenuItem>
            </Menu>
        </Sidebar>
    );
}

export default SidebarComp;