import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { PackageGet } from "../Admin/CreateOrEditPackage/createOrEditPackageModels";
import Search from "../Home/Packages/Search";
import CarousalComp from "../CarousalComp/CarousalComp";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import PackageCard from "../PackageCard/PackageCard";
import ContactUsSection from "../Home/ContactUsSection/ContactUsSection";
import { fetchHoneymoonPackages } from "../../services/Slice/packageSlice";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import FilterComp from "../FilterComp/FilterComp";

const HoneymoonComp: React.FC = () => {
    const dispatch = useAppDispatch();
    const axiosPrivate = useAxiosPrivate();
    const route = "honeymoon";
    const { honeymoonPackages, honeymoonPackageStatus, honeymoonPackageError } = useAppSelector((state: any) => state.packageSlice);
    const hasFixedPackages = honeymoonPackages?.some((elem: PackageGet) => elem.isFixedDeparture == true);

    const items = [
        {
            id: "1",
            backgroundUrl: "/src/assets/videos/hh1.mp4"
        },
        {
            id: "2",
            backgroundUrl: "/src/assets/videos/hh2.mp4"
        }
    ]

    useEffect(() => {
        dispatch(fetchHoneymoonPackages({ axiosPrivate }));
    }, []);

    return (
        <section className="hon_package">
            <div className="package_hero hero">
                <CarousalComp items={items} />
                <div className="hero_text_welcome">
                    <h1 className="welcome_text welcome_package">Honeymoon Packages</h1>
                </div>
            </div>
            {/* <Search /> */}
            {/* <div className="packate_list_par">
                {
                    honeymoonPackages === "loading" ? (
                        <div className="loading_wrapper">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <>
                            {
                                hasFixedPackages &&
                                <div className="fixed_departure">
                                    <h2>Fixed Departure Honeymoon Packages</h2>
                                    <div className="package_container">
                                        {
                                            honeymoonPackages?.map((elem: PackageGet) => (
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
                                    <h2>Honeymoon Packages</h2>
                                    <div className="package_container">
                                        {
                                            honeymoonPackages?.map((elem: PackageGet) => (
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
                        honeymoonPackageStatus === "loading" ?
                            (
                                <div className="loading_wrapper">
                                    <LoadingSpinner />
                                </div>
                            ) :
                            (
                                honeymoonPackages.length ?
                                    (
                                        <>Package available</>
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

export default HoneymoonComp;