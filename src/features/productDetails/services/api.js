import axiosInstance from "../../../services/axios";

async function getProduct(productId) {
    try {
        const response = await axiosInstance.get(`/products/get-product/${productId}`);
        return response?.data;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
    
}

export { getProduct }