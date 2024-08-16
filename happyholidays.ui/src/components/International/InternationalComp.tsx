import React, { useEffect } from "react";
import { fetchInternationalPackage } from "./internationalts";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { useNavigate } from "react-router-dom";

const InternationalComp: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {internationalPackages, internationalPackageStatus, internationalPackageError} = useAppSelector((state: any) => state.packageSlice);

    useEffect(() => {
        dispatch(fetchInternationalPackage());
    }, []);
    return (
        <section className="int_packages">
            <h2>International test</h2>
            {internationalPackages?.map((elem: any) => {
                return (
                    <div className="package_card" key={elem.id}>
                        <p key={elem.id}>{elem.packageName}</p>
                        <button onClick={() => navigate(`/details/${elem.packageId}`)}>Details</button>
                    </div>
                );
            })}
        </section>
    );
}

export default InternationalComp;