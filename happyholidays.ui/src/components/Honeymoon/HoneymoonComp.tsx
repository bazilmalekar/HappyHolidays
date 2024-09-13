import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { fetchHoneymoonPackages } from "./honeymoonts";
import { useNavigate } from "react-router-dom";
import { PackageGet } from "../Admin/CreateOrEditPackage/createOrEditPackageModels";

const HoneymoonComp: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { honeymoonPackages, honeymoonPackageStatus, honeymoonPackageError } = useAppSelector((state: any) => state.packageSlice);

    useEffect(() => {
        dispatch(fetchHoneymoonPackages());
    }, []);

    return (
        <section className="hon_package">
            {
                honeymoonPackages?.map((elem: PackageGet) => (
                    elem.isActive && (
                        <div className="package_card" key={elem.packageId}>
                            <p>{elem.packageName}</p>
                            <button onClick={() => navigate(`/details/${elem.packageId}`)}>Details</button>
                        </div>
                    )
                ))
            }
        </section>
    );
}

export default HoneymoonComp;