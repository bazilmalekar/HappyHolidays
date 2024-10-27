import React from "react";
import { Link, useLocation } from "react-router-dom";
import { convertSlugToTitle } from "./convertSlugValue";


const BredCrumb: React.FC = () => {
    const location = useLocation();
    const pathNames = location.pathname.split('/').filter(x => x);
    return (
        <nav className="bread_crumb">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {
                    pathNames.map((value, index) => {
                        const last = index == pathNames.length - 2; // adjust the length accordingly, if you have id at last
                        const lastSlice = index == pathNames.length - 1; // adjust the length accordingly, for slash symbol
                        const to = `/${pathNames.slice(0, index + 1).join("/")}`;
                        const tite = convertSlugToTitle(value)

                        return (
                            <li key={index}>
                                {!lastSlice && <span className="ms-2">/</span>}
                                {
                                    last ? (
                                        <span className="ms-2">{tite}</span>
                                    ) : (
                                        <Link className="ms-2" to={to}>{tite}</Link>
                                    )
                                }
                            </li>
                        );
                    })
                }
            </ul>


        </nav>
    );
}

export default BredCrumb;