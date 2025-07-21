import axiosInstance from "../../../services/axios";

async function getProduct(productId) {
    try {
        const response = await axiosInstance.get(`/api/products/get-product/${productId}`);
        return response?.data;
    } catch (error) {
        console.error('API error:', error);
    }
}

async function addReview(productId, review) {
    try {
        const response = await axiosInstance.post(`/api/products/add-review/${productId}`, review);
        return response?.data;
    } catch (error) {
        console.error('API error:', error);
    }
}

async function getReviews(productId) {
    try {
        const response = await axiosInstance.get(`/api/products/get-reviews/${productId}`);
        return response?.data;
    } catch (error) {
        console.error('API error:', error);
    }
}

export { getProduct, addReview, getReviews };