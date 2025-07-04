import axios from "axios";

const BASE_URL = import.meta.env.REACT_APP_API_URL;
const timeoutErrorMessage = 'Could not load the activity, Please try again!'

const axiosInstance=axios.create({
    baseURL:BASE_URL,
    timeout: 10000,
    timeoutErrorMessage: timeoutErrorMessage,
});

export default axiosInstance;   