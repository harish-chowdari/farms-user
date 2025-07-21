const getUserId = () => {
    try {
        return localStorage.getItem('userId');
    } catch (error) {
        console.error('Error accessing localStorage:', error);
        return null;
    }
};

export default getUserId