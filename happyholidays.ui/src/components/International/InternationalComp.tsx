import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { PackageGet } from "../Admin/CreateOrEditPackage/createOrEditPackageModels";
import Search from "../Home/Packages/Search";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { RootState } from "../../services/store";
import CarousalComp from "../CarousalComp/CarousalComp";
import ContactUsSection from "../Home/ContactUsSection/ContactUsSection";
import PackageCard from "../PackageCard/PackageCard";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { fetchInternationalPackage } from "../../services/Slice/packageSlice";
import FilterComp from "../FilterComp/FilterComp";

const InternationalComp: React.FC = () => {
    const dispatch = useAppDispatch();
    const axiosPrivate = useAxiosPrivate();
    const route = "international";
    const { internationalPackages, internationalPackageStatus, internationalPackageError } = useAppSelector((state: RootState) => state.packageSlice);
    const hasFixedPackages = internationalPackages?.some((elem: PackageGet) => elem.isFixedDeparture == true);
    console.log("internationalPackages", internationalPackages);


    const items = [
        {
            id: "1",
            backgroundUrl: "/src/assets/videos/int1.mp4"
        },
        {
            id: "2",
            backgroundUrl: "/src/assets/videos/int2.mp4"
        }
    ]

    useEffect(() => {
        dispatch(fetchInternationalPackage({ axiosPrivate }));
    }, []);
    return (
        <section className="int_packages">
            <div className="package_hero hero">
                <CarousalComp items={items} />
                <div className="hero_text_welcome">
                    <h1 className="welcome_text welcome_package">International Packages</h1>
                </div>
            </div>
            {/* <Search /> */}
            {/* <div className="packate_list_par">
                {
                    internationalPackageStatus === "loading" ? (
                        <div className="loading_wrapper">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <>
                            {
                                hasFixedPackages &&
                                <div className="fixed_departure">
                                    <h2>Fixed Departure International Packages</h2>
                                    <div className="package_container">
                                        {
                                            internationalPackages?.map((elem: PackageGet) => (
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
                                    <h2>International Packages</h2>
                                    <div className="package_container">
                                        {
                                            internationalPackages?.map((elem: PackageGet) => (
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
                        internationalPackageStatus === "loading" ?
                            (
                                <div className="loading_wrapper">
                                    <LoadingSpinner />
                                </div>
                            ) :
                            (
                                internationalPackages.length ?
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

export default InternationalComp;

