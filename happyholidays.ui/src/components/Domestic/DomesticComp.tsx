import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { PackageGet } from "../Admin/CreateOrEditPackage/createOrEditPackageModels";
import CarousalComp from "../CarousalComp/CarousalComp";
import Search from "../Home/Packages/Search";
import ContactUsSection from "../Home/ContactUsSection/ContactUsSection";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import PackageCard from "../PackageCard/PackageCard";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { RootState } from "../../services/store";
import { fetchDomesticPackages } from "../../services/Slice/packageSlice";
import FilterComp from "../FilterComp/FilterComp";

const DomesticComp: React.FC = () => {
    const dispatch = useAppDispatch();
    const axiosPrivate = useAxiosPrivate();
    const route = "domestic";
    const { domesticPackages, domesticPackageStatus, domesticPackageError } = useAppSelector((state: RootState) => state.packageSlice);
    const hasFixedPackages = domesticPackages?.some((elem: PackageGet) => elem.isFixedDeparture == true);
    console.log("domesticPackages", domesticPackages);


    console.log("domesticPackages", domesticPackages);

    const items = [
        {
            id: "1",
            backgroundUrl: "/src/assets/videos/dom1.mp4"
        },
        {
            id: "2",
            backgroundUrl: "/src/assets/videos/dom2.mp4"
        }
    ]

    useEffect(() => {
        dispatch(fetchDomesticPackages({ axiosPrivate }));
    }, []);
    return (
        <section className="dom_packages">
            <div className="package_hero hero">
                <CarousalComp items={items} />
                <div className="hero_text_welcome">
                    <h1 className="welcome_text welcome_package">Domestic Packages</h1>
                </div>
            </div>
            {/* <Search /> */}

            {/* <div className="packate_list_par">
                {
                    domesticPackageStatus === "loading" ? (
                        <div className="loading_wrapper">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <>
                            {
                                hasFixedPackages &&
                                <div className="fixed_departure">
                                    <h2>Fixed Departure Domestic Packages</h2>
                                    <div className="package_container">
                                        {
                                            domesticPackages?.map((elem: PackageGet) => (
                                                elem.isActive && elem.isFixedDeparture && (
                                                    <PackageCard elem={elem} route={route} />
                                                )
                                            ))
                                        }
                                    </div>
                                </div>
                            }
                            {
                                <div className="non_fixed_departure">
                                    <h2>Domestic Packages</h2>
                                    <div className="package_container">
                                        {
                                            domesticPackages?.map((elem: PackageGet) => (
                                                elem.isActive && !elem.isFixedDeparture && (
                                                    <PackageCard elem={elem} route={route} />
                                                )
                                            ))
                                        }
                                    </div>
                                </div>
                            }
                        </>
                    )
                }
            </div> */}
            <div className="packate_list_par">
                <div className="filter_section">
                    <FilterComp />
                </div>
                <div className="package_list">
                    {
                        domesticPackageStatus === "loading" ?
                            (
                                <div className="loading_wrapper">
                                    <LoadingSpinner />
                                </div>
                            ) :
                            (
                                domesticPackages.length ?
                                    (
                                        <></>

                                    ) :
                                    (
                                        <div className="no_packages">
                                            <h3>Please visit us again soon.</h3>
                                            <p>Sorry, no packages are available at the moment...</p>
                                        </div>
                                    )
                            )
                    }
                </div>
            </div>
            <ContactUsSection />
        </section>
    );
}

export default DomesticComp;