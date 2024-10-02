import React, { useEffect } from "react";
import { fetchInternationalPackage } from "./internationalts";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { useNavigate } from "react-router-dom";
import { PackageGet } from "../Admin/CreateOrEditPackage/createOrEditPackageModels";
import Search from "../Home/Packages/Search";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import TodayIcon from '@mui/icons-material/Today';
import PriceConverter from "../../Hooks/PriceConverter";
import { RootState } from "../../services/store";

const InternationalComp: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { internationalPackages, internationalPackageStatus, internationalPackageError } = useAppSelector((state: RootState) => state.packageSlice);
    console.log(internationalPackages);

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
            <div className="packate_list_par">
                {
                    internationalPackageStatus === "loading" ? (
                        <div className="loading_wrapper">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <>
                            {

                                <div className="fixed_departure">
                                    <h2>Fixed Departure International Packages</h2>
                                    <div className="package_container">

                                        {
                                            internationalPackages?.map((elem: PackageGet) => (
                                                elem.isActive && elem.isFixedDeparture && (
                                                    <div className="card_par" key={elem.packageId}>
                                                        <div className="package_card">
                                                            <div className="card_image_container">
                                                                <img src={`${elem.cardThumbNailImage}`} alt="Card Image" />
                                                            </div>
                                                            <div className="card_details_container">
                                                                {
                                                                    elem.packageLocation &&
                                                                    <p className="package_location">
                                                                        <LocationOnOutlinedIcon className="package_icon" />
                                                                        {elem.packageLocation}
                                                                    </p>
                                                                }
                                                                {
                                                                    elem.packageName &&
                                                                    <p className="package_name">{elem.packageName}</p>
                                                                }
                                                                {
                                                                    (elem.days || elem.nights) &&
                                                                    <div className="package_duration">
                                                                        <TodayIcon className="package_icon" />
                                                                        <p className="package_duration_text">{elem.days} Days / </p>
                                                                        <p className="package_duration_text">{elem.nights} Nights</p>
                                                                    </div>
                                                                }
                                                                {
                                                                    (elem.originalPrice || elem.actualPrice) &&
                                                                    <div className="package_cost">
                                                                        <p className="cost_text">Package cost: </p>
                                                                        <p className="op"><PriceConverter price={elem.originalPrice} /></p>
                                                                        <p className="ap"><PriceConverter price={elem.actualPrice} /></p>
                                                                    </div>
                                                                }
                                                            </div>
                                                            <div className="replace_div">
                                                                <h6 className="trade_mark">Happy Holidays !</h6>
                                                                <button className="card_btn" onClick={() => navigate(`/details/${elem.packageId}`)}>View Details</button>
                                                            </div>
                                                        </div>
                                                    </div>
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
                                                    <div className="card_par" key={elem.packageId}>
                                                        <div className="package_card">
                                                            <div className="card_image_container">
                                                                <img src={`${elem.cardThumbNailImage}`} alt="Card Image" />
                                                            </div>
                                                            <div className="card_details_container">
                                                                {
                                                                    elem.packageLocation &&
                                                                    <p className="package_location">
                                                                        <LocationOnOutlinedIcon className="package_icon" />
                                                                        {elem.packageLocation}
                                                                    </p>
                                                                }
                                                                {
                                                                    elem.packageName &&
                                                                    <p className="package_name">{elem.packageName}</p>
                                                                }
                                                                {
                                                                    (elem.days || elem.nights) &&
                                                                    <div className="package_duration">
                                                                        <TodayIcon className="package_icon" />
                                                                        <p className="package_duration_text">{elem.days} Days / </p>
                                                                        <p className="package_duration_text">{elem.nights} Nights</p>
                                                                    </div>
                                                                }
                                                                {
                                                                    (elem.originalPrice || elem.actualPrice) &&
                                                                    <div className="package_cost">
                                                                        <p className="cost_text">Package cost: </p>
                                                                        <p className="op"><PriceConverter price={elem.originalPrice} /></p>
                                                                        <p className="ap"><PriceConverter price={elem.actualPrice} /></p>
                                                                    </div>
                                                                }
                                                            </div>
                                                            <div className="replace_div">
                                                                <h6 className="trade_mark">Happy Holidays !</h6>
                                                                <button className="card_btn" onClick={() => navigate(`/details/${elem.packageId}`)}>View Details</button>
                                                            </div>
                                                        </div>
                                                    </div>
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
        </section>
    );
}

export default InternationalComp;

