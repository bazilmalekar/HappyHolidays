import { useAppDispatch } from "../services/hooks";
import { axiosPrivate } from "../services/Slice/Api/axios";
import { setCredentials } from "../services/Slice/authSlice";

const useRefreshToken = () => {
    const dispatch = useAppDispatch();

    const refresh = async () => {
        const response = await axiosPrivate.post("api/TokenRequest/refresh-token", {
            withCredentials: true
        });
        dispatch(setCredentials(response.data));
        return response.data;
    }
    return refresh;
}

export default useRefreshToken;