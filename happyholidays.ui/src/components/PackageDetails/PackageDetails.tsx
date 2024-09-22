import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { fetchPackageDetails } from "./packageDetailsts";

const PackageDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { packageDetails, packageDetailsStatus, packageDetailsError } = useAppSelector((state: any) => state.packageSlice);

    useEffect(() => {
        if (id) {
            dispatch(fetchPackageDetails(id));
        }
    }, [id, dispatch]);

    return (
        <section className="package_details">
            {
                packageDetails && (
                    <>
                        <h1>{packageDetails.packageName}</h1>
                        <p>{packageDetails.packageLocation}</p>
                        <p>Days: {packageDetails.days}</p>
                        <p>Nights: {packageDetails.nights}</p>
                        <p>Nights: {packageDetails.nights}</p>
                        <p>original price: {packageDetails.originalPrice}</p>
                        <p>Price: {packageDetails.actualPrice}</p>
                    </>
                )
            }
        </section>
    );
}

export default PackageDetails;