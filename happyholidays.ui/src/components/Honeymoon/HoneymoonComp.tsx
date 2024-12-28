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
            <div className="package_hero">
                <CarousalComp items={items} />
                <div className="package_hero_content">
                    <h2 className="package_type">Honeymoon Packages</h2>
                </div>
            </div>
            <Search />
            <div className="packate_list_par">
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
            </div>
            <ContactUsSection />
        </section>
    );
}

export default HoneymoonComp;