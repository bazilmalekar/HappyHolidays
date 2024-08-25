import React, { useEffect } from "react";
import { deletePackage, getAllPackages } from "./allpackagests";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { useNavigate } from "react-router-dom";

const AllPackages: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { allPackages, allPackagesStatus, allPackagesError } = useAppSelector((state: any) => state.packageSlice);


    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this package?")) {
            try {
                await dispatch(deletePackage(id)).unwrap(); // Unwrap to handle result or error
                await dispatch(getAllPackages()).unwrap(); // Unwrap to handle result or error
            } catch (error) {
                console.error('Error occurred:', error);
            }
        }
    };

    useEffect(() => {
        dispatch(getAllPackages());
    }, [dispatch])
    return (
        <section className="allPackages">
            <div className="allPackages_submenu">
                <h2>All Packages</h2>
            </div>
            <div className="admin_package_wrapper">
                <h6>International</h6>
                <div className="admin_package_table_par">
                    <table>
                        <thead>
                            <tr>
                                <th>Package name</th>
                                <th>Is Active</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                allPackages
                                    .filter((elem: any) => elem.packageType === 0)
                                    .map((filteredElem: any) => {
                                        return (
                                            <tr key={filteredElem.$id}>
                                                <td>{filteredElem.packageName}</td>
                                                <input type="radio" />
                                                <button onClick={() => navigate(`/admin/edit-package/${filteredElem.packageId}`)}>Edit</button>
                                                <button onClick={() => handleDelete(filteredElem.packageId)}>Delete</button>
                                            </tr>
                                        );
                                    })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            <div className="admin_package_wrapper">
                <h6>Domestic</h6>
                <div className="admin_package_cards_par">
                    <table>
                        <thead>
                            <tr>
                                <th>Package name</th>
                                <th>Is Active</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                allPackages
                                    .filter((elem: any) => elem.packageType === 1)
                                    .map((filteredElem: any) => {
                                        return (
                                            <tr key={filteredElem.$id}>
                                                <td>{filteredElem.packageName}</td>
                                                <input type="radio" />
                                                <button onClick={() => navigate(`/admin/edit-package/${filteredElem.packageId}`)}>Edit</button>
                                                <button onClick={() => handleDelete(filteredElem.packageId)}>Delete</button>
                                            </tr>
                                        );
                                    })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            <div className="admin_package_wrapper">
                <h6>Honeymoon</h6>
                <div className="admin_package_cards_par">
                    <table>
                        <thead>
                            <tr>
                                <th>Package name</th>
                                <th>Is Active</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                allPackages
                                    .filter((elem: any) => elem.packageType === 2)
                                    .map((filteredElem: any) => {
                                        return (
                                            <tr key={filteredElem.$id}>
                                                <td>{filteredElem.packageName}</td>
                                                <input type="radio" />
                                                <button onClick={() => navigate(`/admin/edit-package/${filteredElem.packageId}`)}>Edit</button>
                                                <button onClick={() => handleDelete(filteredElem.packageId)}>Delete</button>
                                            </tr>
                                        );
                                    })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default AllPackages;