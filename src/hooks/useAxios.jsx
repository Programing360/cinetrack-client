import axios from "axios";

export const useAxiosSecure = () => {
    const axiosSecure = axios.create({
        baseURL: "http://localhost:5000",
    });
    return axiosSecure;
}