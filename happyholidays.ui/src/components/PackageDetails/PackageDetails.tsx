import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { fetchPackageDetails } from "../../services/Slice/packageSlice";
import BredCrumb from "../BredCrumb/BredCrumb";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Gallery from "../Gallery/Gallery";
import PriceConverter from "../../Hooks/PriceConverter";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import Accordion from "react-bootstrap/esm/Accordion";

const PackageDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { packageDetails, packageDetailsStatus, packageDetailsError } = useAppSelector((state: any) => state.packageSlice);
    
    useEffect(() => {
        if (id) {
            window.scrollTo({
                top: 0
            })
            dispatch(fetchPackageDetails(id));
        }
    }, [id, dispatch]);

    return (
        <section className="package_details">
            <BredCrumb />
            {
                packageDetails && (
                    <>
                        <div className="title_location">
                            <h5 className="title_name">{packageDetails.packageName}</h5>
                            {
                                packageDetails.packageLocation &&
                                <div className="location_details">
                                    <LocationOnOutlinedIcon className="package_icon" />
                                    <p>{packageDetails.packageLocation}</p>
                                </div>
                            }
                        </div>
                        <div className="details_wrapper">
                            <div className="images_wrapper">
                                <Gallery />
                            </div>
                            <div className="package_cost_wrapper">
                                <div className="package_title_location">
                                    <h4 className="p_title">{packageDetails.packageName}</h4>
                                    {
                                        packageDetails.packageLocation &&
                                        <div className="location_details">
                                            <LocationOnOutlinedIcon className="package_icon" />
                                            <p>{packageDetails.packageLocation}</p>
                                        </div>
                                    }
                                </div>
                                <div className="package_cost">
                                    <h6>Package cost / Per Individual:</h6>
                                    <p className="op"><PriceConverter price={packageDetails.originalPrice} /></p>
                                    <p className="ap"><PriceConverter price={packageDetails.actualPrice} /></p>
                                </div>
                                <div className="package_duration">
                                    <h6>Package Duration:</h6>
                                    <div className="duration_details">
                                        <p>{packageDetails.days} Days</p> {"/"}
                                        <p>{packageDetails.nights} Nights</p>
                                    </div>
                                </div>
                                <div className="divider"></div>
                                <div className="contact">
                                    <h4 className="contact_heading">Contact Us At</h4>
                                    <div className="contact_details">
                                        <div className="contact_info_text_wrapper">
                                            <div className="contact_info_text_icon_wrapper">
                                                <PhoneEnabledIcon className="contact_icon" />
                                            </div>
                                            <i>+91-8660594295</i>
                                        </div>
                                        <div className="contact_info_text_wrapper">
                                            <div className="contact_info_text_icon_wrapper">
                                                <MailOutlineIcon className="contact_icon" />
                                            </div>
                                            <i>info@happyholidaysdharwad.com</i>
                                        </div>
                                    </div>
                                </div>
                                <div className="itinerary_download">
                                    <button className="itinerary_download_btn">Download Package Details</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
            {
                packageDetails?.packageDetails?.packageDescription &&
                <div className="package_description_wrapper">
                    <div className="package_description">
                        <div className="package_description_header">
                            <h4>Itinerary Overview</h4>
                        </div>
                        <div className="package_description_body">
                            <p>{packageDetails?.packageDetails?.packageDescription}</p>
                        </div>
                    </div>
                </div>

            }

            <div className="itinerary_details_header_wrapper">
                <div className="itinerary_details_header">
                    <h4>Itinerary Details</h4>
                </div>
            </div>
            <div className="itinerary_details">
                <Accordion defaultActiveKey={["0"]} flush className="custom_details_accordian">
                    {
                        packageDetails?.packageDetails?.itineraryDetails?.$values?.map((elem: any) => {
                            return (
                                <Accordion.Item eventKey={elem.$id} key={elem.$id} className="custom_details_accordian_item">
                                    <Accordion.Header className="custom_details_accordian_header">{elem.itineraryTitle}</Accordion.Header>
                                    <Accordion.Body className="custom_details_accordian_body">
                                        <ul>
                                            {
                                                elem.itineraryDescriptions?.$values
                                                    .filter((points: any) => points.itineraryPoints) //used to filter out null or empty itineraryPoints
                                                    .map((points: any) => (
                                                        <li key={points.$id}>
                                                            {points.itineraryPoints}
                                                        </li>
                                                    ))
                                            }
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                            );
                        })
                    }
                </Accordion>
            </div>
        </section >
    );
}

export default PackageDetails;