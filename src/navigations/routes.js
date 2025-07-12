const ROUTES = {
    // AUTH
    LOGIN: '/login',
    SIGNUP: '/signup',
    PASSWORD_RESET: '/password-reset',

    // USER
    HOME: '/',

    // PRODUCT
    ADD_PRODUCT: '/product-management/add-product',
    VIEW_PRODUCTS: '/product-management/view-products',
    EDIT_PRODUCT: '/product-management/edit-product/:id',
    PRODUCT_DETAILS: '/product-management/product-details/:productId',

    // CUSTOMER
    CUSTOMERS: '/customer-management/customers',
    CUSTOMER_VIEW_PROFILE: '/customer-management/view-profile/:customerId',

    // INVENTORY
    INVENTORY_MANAGEMENT: '/inventory-management',

    // DASHBOARD
    DASHBOARD: '/dashboard'
}

export default ROUTES