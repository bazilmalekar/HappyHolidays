// This hook is to attach the interseptors to "axiosPrivate" instance
import { useEffect } from "react";
import { useAppSelector } from "../services/hooks"
import { RootState } from "../services/store"
import useRefreshToken from "./useRefreshToken";
import { axiosPrivate } from "../services/Slice/Api/axios";

const useAxiosPrivate = () => {
    const { token } = useAppSelector((state: RootState) => state.authSlice);

    const refresh = useRefreshToken();
    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${token}`
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response, //if everythig is alright, send the response.
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) { //to call the refresh token once.
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [token, refresh]);

    return axiosPrivate;
}

export default useAxiosPrivate;