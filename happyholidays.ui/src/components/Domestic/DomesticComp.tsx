import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { fetchDomesticPackages } from "./domesticts";
import { useNavigate } from "react-router-dom";
import { PackageGet } from "../Admin/CreateOrEditPackage/createOrEditPackageModels";
import CarousalComp from "../CarousalComp/CarousalComp";
import Search from "../Home/Packages/Search";

const DomesticComp: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { domesticPackages, domesticPackageStatus, domesticPackageError } = useAppSelector((state: any) => state.packageSlice);

    // const items = [
    //     {
    //         id: "1",
    //         backgroundUrl: "/src/assets/images/Domestic/image1.jpg"
    //     },
    //     {
    //         id: "2",
    //         backgroundUrl: "/src/assets/images/Domestic/image2.jpg"
    //     },
    //     {
    //         id: "3",
    //         backgroundUrl: "/src/assets/images/Domestic/image3.jpg"
    //     },
    //     {
    //         id: "4",
    //         backgroundUrl: "/src/assets/images/Domestic/image4.jpg"
    //     },
    //     {
    //         id: "5",
    //         backgroundUrl: "/src/assets/images/Domestic/image5.jpg"
    //     }
    // ]

    useEffect(() => {
        dispatch(fetchDomesticPackages());
    }, []);
    return (
        <section className="dom_packages">
            {/* <CarousalComp items={items} /> */}
            <div className="package_hero" style={{ backgroundImage: `url("/src/assets/images/Domestic/image1.jpg")` }}>
                <div className="package_hero_content">
                    <h3 className="company_name">Happy Holidays !</h3>
                    <h2 className="package_type">Domestic Packages</h2>
                </div>
            </div>
            <Search />

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