import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { fetchDomesticPackages } from "./domesticts";
import { Link, useNavigate } from "react-router-dom";
import { PackageGet } from "../Admin/CreateOrEditPackage/createOrEditPackageModels";
import CarousalComp from "../CarousalComp/CarousalComp";
import Search from "../Home/Packages/Search";

const DomesticComp: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { domesticPackages, domesticPackageStatus, domesticPackageError } = useAppSelector((state: any) => state.packageSlice);

    useEffect(() => {
        dispatch(fetchDomesticPackages());
    }, []);
    return (
        <section className="dom_packages">
            <div className="package_hero" style={{ backgroundImage: `url("/src/assets/images/Domestic/image1.jpg")` }}>
                <div className="package_hero_content">
                    <h3 className="company_name">Happy Holidays !</h3>
                    <h2 className="package_type">Domestic Packages</h2>
                </div>
            </div>
            <Search />
            <div className="packate_list_par">
                {
                    domesticPackages?.map((elem: PackageGet) => (
                        elem.isActive && (
                            <div className="card_par" key={elem.packageId}>
                                <div className="package_card">
                                    <div className="card_image_container">

                                    </div>
                                    <div className="card_details_container">
                                        <p>{elem.packageLocation}</p>
                                        <p>{elem.packageName}</p>
                                        <p>{elem.originalPrice}</p>
                                        <p>{elem.actualPrice}</p>
                                        <p>{elem.days}</p>
                                        <p>{elem.nights}</p>
                                        <p>{elem.packageName}</p>
                                        <button onClick={() => navigate(`/details/${elem.packageId}`)}>Details</button>
                                    </div>
                                </div>
                            </div>
                        )
                    ))
                }
            </div>
        </section>
    );
}

export default DomesticComp;