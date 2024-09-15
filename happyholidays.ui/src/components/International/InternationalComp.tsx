import React, { useEffect } from "react";
import { fetchInternationalPackage } from "./internationalts";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { useNavigate } from "react-router-dom";
import { PackageGet } from "../Admin/CreateOrEditPackage/createOrEditPackageModels";
import Search from "../Home/Packages/Search";

const InternationalComp: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { internationalPackages, internationalPackageStatus, internationalPackageError } = useAppSelector((state: any) => state.packageSlice);

    useEffect(() => {
        dispatch(fetchInternationalPackage());
    }, []);
    return (
        <section className="int_packages">
            <div className="package_hero" style={{ backgroundImage: `url("/src/assets/images/International/image1.jpg")` }}>
                <div className="package_hero_content">
                    <h3 className="company_name">Happy Holidays !</h3>
                    <h2 className="package_type">International Packages</h2>
                </div>
            </div>
            <Search />
            <h2>International test</h2>
            {
                internationalPackages?.map((elem: PackageGet) => (
                    elem.isActive && (
                        <div className="package_card" key={elem.packageId}>
                            <p>{elem.packageName}</p>
                            <button onClick={() => navigate(`/details/${elem.packageId}`)}>Details</button>
                        </div>
                    )))
            }
        </section>
    );
}

export default InternationalComp;

