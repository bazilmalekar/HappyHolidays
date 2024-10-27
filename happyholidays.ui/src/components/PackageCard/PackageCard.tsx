import React from "react";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import TodayIcon from '@mui/icons-material/Today';
import PriceConverter from "../../Hooks/PriceConverter";
import { useNavigate } from "react-router-dom";

interface Props {
    elem: {
        $id: string;
        actualPrice: number;
        cardThumbNailImage: string | null;
        days: number;
        isActive: boolean;
        isFixedDeparture: boolean;
        nights: number;
        originalPrice: number;
        packageId: number;
        packageLocation: string;
        packageName: string;
        packageType: number;
    };
    route: string;
}

const PackageCard: React.FC<Props> = ({ elem, route }) => {
    const navigate = useNavigate();

    return (
        <>
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
                        <button className="card_btn" onClick={() => navigate(`/${route}/details/${elem.packageId}`)}>View Details</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PackageCard;