import React, { useEffect, useState } from "react";
import { deletePackage, getAllPackages } from "./allpackagests";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { useNavigate } from "react-router-dom";
import Switch from '@mui/material/Switch';
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { PackageGet } from "../CreateOrEditPackage/createOrEditPackageModels";
import { editPackage } from "../CreateOrEditPackage/createOrEditPackagets";
import { handleIsActiveChange, resetEditPackageStatus } from "../../../services/Slice/packageSlice";
import { toast } from "react-toastify";
import { axiosPrivate } from "../../../services/Slice/Api/axios";

const AllPackages: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { allPackages, allPackagesStatus, allPackagesError, editPackagePackageStatus, editPackageError } = useAppSelector((state: any) => state.packageSlice);
    const [editIsActive, setEditIsActive] = useState<boolean>(false);
    const [swithId, setSwitchId] = useState<number>();

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this package?")) {
            try {
                await dispatch(deletePackage({ id, axiosPrivate })).unwrap(); // Unwrap to handle result or error
                await dispatch(getAllPackages({ axiosPrivate })).unwrap(); // Unwrap to handle result or error
            } catch (error) {
                console.error('Error occurred:', error);
            }
        }
    };

    const handleSwitchChange = async (packageId: number) => {
        setEditIsActive(true);
        setSwitchId(packageId);
        dispatch(handleIsActiveChange({ id: packageId }));



    };

    useEffect(() => {
        if (editIsActive && editPackagePackageStatus === "success") {
            setEditIsActive(false);
            dispatch(resetEditPackageStatus());
            toast.success("Package Updated Successfully", {
                position: "top-center"
            })
        } else if (editIsActive && editPackagePackageStatus === "failed") {
            toast.error(`${editPackageError.title}`, {
                position: "top-center"
            })
        }
    }, [editPackagePackageStatus]);

    useEffect(() => {
        const [updatedPackage] = allPackages.filter((elem: PackageGet) => {
            return elem.packageId == swithId;
        });
        dispatch(editPackage(updatedPackage));
    }, [allPackages])

    useEffect(() => {
        dispatch(getAllPackages({ axiosPrivate }));
    }, [dispatch])
    return (
        <section className="allPackages">
            <div className="allPackages_submenu">
                <h2>All Packages</h2>
            </div>
            <div className="admin_package_wrapper">
                <div className="admin_package_table_par">
                    <h3>International</h3>
                    {
                        allPackagesStatus === "loading" ?
                            (
                                <div className="loading_comp">
                                    <LoadingSpinner />
                                </div>
                            ) :
                            (
                                <table className="custom_table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Package name</th>
                                            <th>Is Active</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allPackages
                                                .filter((elem: any) => elem.packageType === 0)
                                                .map((filteredElem: any, i: number) => {
                                                    return (
                                                        <tr key={filteredElem.$id}>
                                                            <td>{i + 1}</td>
                                                            <td>{filteredElem.packageName}</td>
                                                            <td>
                                                                <Switch
                                                                    checked={filteredElem.isActive}
                                                                    onChange={() => handleSwitchChange(filteredElem.packageId)}
                                                                />
                                                            </td>
                                                            <td>
                                                                <button className="custon_primary_button" onClick={() => navigate(`/admin/edit-package/${filteredElem.packageId}`)}>Edit</button>
                                                                <button className="custon_delete_button" onClick={() => handleDelete(filteredElem.packageId)}>Delete</button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                        }

                                    </tbody>
                                </table>
                            )
                    }

                </div>
            </div>
            <div className="admin_package_wrapper">
                <div className="admin_package_table_par">
                    <h3>Domestic</h3>
                    {
                        allPackagesStatus === "loading" ?
                            (
                                <div className="loading_comp">
                                    <LoadingSpinner />
                                </div>
                            ) :
                            (
                                <table className="custom_table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Package name</th>
                                            <th>Is Active</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allPackages
                                                .filter((elem: any) => elem.packageType === 1)
                                                .map((filteredElem: any, i: number) => {
                                                    return (
                                                        <tr key={filteredElem.$id}>
                                                            <td>{i + 1}</td>
                                                            <td>{filteredElem.packageName}</td>
                                                            <td>
                                                                <Switch
                                                                    checked={filteredElem.isActive}
                                                                    onChange={() => handleSwitchChange(filteredElem.packageId)}
                                                                />
                                                            </td>
                                                            <td>
                                                                <button className="custon_primary_button" onClick={() => navigate(`/admin/edit-package/${filteredElem.packageId}`)}>Edit</button>
                                                                <button className="custon_delete_button" onClick={() => handleDelete(filteredElem.packageId)}>Delete</button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                        }

                                    </tbody>
                                </table>
                            )
                    }

                </div>
            </div>
            <div className="admin_package_wrapper">
                <div className="admin_package_table_par">
                    <h3>Honeymoon</h3>
                    {
                        allPackagesStatus === "loading" ?
                            (
                                <div className="loading_comp">
                                    <LoadingSpinner />
                                </div>
                            ) :
                            (
                                <table className="custom_table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Package name</th>
                                            <th>Is Active</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            allPackages
                                                .filter((elem: any) => elem.packageType === 2)
                                                .map((filteredElem: any, i: number) => {
                                                    return (
                                                        <tr key={filteredElem.$id}>
                                                            <td>{i + 1}</td>
                                                            <td>{filteredElem.packageName}</td>
                                                            <td>
                                                                <Switch
                                                                    checked={filteredElem.isActive}
                                                                    onChange={() => handleSwitchChange(filteredElem.packageId)}
                                                                />
                                                            </td>
                                                            <td>
                                                                <button className="custon_primary_button" onClick={() => navigate(`/admin/edit-package/${filteredElem.packageId}`)}>Edit</button>
                                                                <button className="custon_delete_button" onClick={() => handleDelete(filteredElem.packageId)}>Delete</button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                        }

                                    </tbody>
                                </table>
                            )
                    }
                </div>
            </div>
        </section>
    );
}

export default AllPackages;