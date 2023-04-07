import axios from "axios"
export const serverUrl = "http://localhost:8005/task";

export const getApiHandler = async (endpoint) => {
    try {
        const result = await axios.get(serverUrl + endpoint);
        return result.data;
    } catch (error) {
        return error;
    }
}
export const postApiHandler = async (endpoint, params) => {
    try {
        console.log("endpoint=", endpoint);
        console.log("params==", params);
        const result = await axios.post(serverUrl + endpoint, params);
        console.log("result===", result);
        return result.data;
    } catch (error) {
        console.log("cath error===", error);
        return error;
    }
}
