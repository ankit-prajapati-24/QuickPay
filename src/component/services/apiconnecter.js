import axios from "axios"

export const axiosInstance = axios.create({});
const Base_Url = "https://eventpaymentsystem.onrender.com/";
export const apiConnecter = (method, url, bodyData, headers, params) => {
    console.log(url, bodyData, headers, params);
    return axiosInstance({
        method:`${method}`,
        url,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}
