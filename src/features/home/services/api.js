import axiosInstance from "../../../services/axios";

async function to5SoldProducts() {
    try {
        const response = await axiosInstance.get(`/api/orders/top-5-sold-products`);
        return response?.data;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
}

export { to5SoldProducts }