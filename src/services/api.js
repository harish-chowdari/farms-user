import axiosInstance from "./axios";

async function getAllProducts() {
    try {
        const response = await axiosInstance.get('/api/products/get-products/paginated');
        return response?.data;
    } catch (error) {
        console.error('API Error:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
}


async function addProductToCart(userId, quantity, productId) {
    try {
        const response = await axiosInstance.post(`/api/auth/add-product-to-cart/${userId}`, { productId, quantity });
        return response?.data;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
}

// auth/increase-quantity
async function increaseQuantity(userId, productId) {
    try {
        const response = await axiosInstance.put(`/api/auth/increase-quantity/${userId}/${productId}`);
        return response?.data;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
}

async function decreaseQuantity(userId, productId) {
    try {
        const response = await axiosInstance.put(`/api/auth/decrease-quantity/${userId}/${productId}`);
        return response?.data;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
}

async function removeProductFromCart(userId, productId) {
    try {
        const response = await axiosInstance.delete(`/api/auth/remove-product-from-cart/${userId}/${productId}`);
        return response?.data;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
}


async function getCartByUserId(userId) {
    try {
        const response = await axiosInstance.get(`/api/auth/get-cart/${userId}`);
        return response?.data;
    } catch (error) {
        console.error('API Error:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
} 

export { getAllProducts, addProductToCart, increaseQuantity, decreaseQuantity, removeProductFromCart, getCartByUserId };