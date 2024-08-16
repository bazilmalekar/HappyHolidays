import React, {useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { fetchHoneymoonPackages } from "./honeymoonts";
import { useNavigate } from "react-router-dom";

const HoneymoonComp: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {honeymoonPackages, honeymoonPackageStatus, honeymoonPackageError} = useAppSelector((state: any) => state.packageSlice);

    useEffect(() => {
        dispatch(fetchHoneymoonPackages());
    }, []);

    return (
        <section className="hon_package">
            {honeymoonPackages?.map((elem: any) => {
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

export default HoneymoonComp;