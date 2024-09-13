import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { fetchDomesticPackages } from "./domesticts";
import { useNavigate } from "react-router-dom";
import { PackageGet } from "../Admin/CreateOrEditPackage/createOrEditPackageModels";

const DomesticComp: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { domesticPackages, domesticPackageStatus, domesticPackageError } = useAppSelector((state: any) => state.packageSlice);

    useEffect(() => {
        dispatch(fetchDomesticPackages());
    }, []);
    return (
        <section className="dom_packages">
            <h2>Domestic test</h2>
            {
                domesticPackages?.map((elem: PackageGet) => (
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

export default DomesticComp;