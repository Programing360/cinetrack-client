import axios from "axios";

export const useAxiosSecure = () => {
    const axiosSecure = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
    });
    return axiosSecure;
}