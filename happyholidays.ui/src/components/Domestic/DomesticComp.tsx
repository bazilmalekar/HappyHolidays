import React, {useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { fetchDomesticPackages } from "./domesticts";
import { useNavigate } from "react-router-dom";

const DomesticComp: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {domesticPackages, domesticPackageStatus, domesticPackageError} = useAppSelector((state: any) => state.packageSlice);

    useEffect(() => {
        dispatch(fetchDomesticPackages());
    }, []);
    return (
        <section className="dom_packages">
            <h2>Domestic test</h2>
            {domesticPackages?.map((elem: any) => {
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

export default DomesticComp;