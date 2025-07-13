import axiosInstance from "./axios";

async function getAllProducts() {
    try {
        const response = await axiosInstance.get('/products/get-products/paginated');
        return response?.data;
    } catch (error) {
        console.error('API Error:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
}

export { getAllProducts };