
// PRODUCTS
export * from "./products/products-pagination";
export * from "./product/get-product-by-slug";
export * from "./product/get-stock-by-slug";
export * from "./product/create-update-product";
export * from "./product/delete-product-image";

// COUNTRIES
export * from "./countries/get-countries";

// AUTH
export * from "./auth/login";
export * from "./auth/logout";
export * from "./auth/registerUser";

// ADDRESS
export * from "./address/set-user-address";
export * from "./address/remove-user-address";
export * from "./address/get-user-address";

// ORDER
export * from "./order/place-order";
export * from "./order/get-order-by-id";
export * from './order/get-orders-by-user'
export * from './order/get-paginated-orders'

// PAYMENTS
export * from './payments/set-transaction-id'
export * from './payments/paypal-check-payment'


// USERS
export * from './users/get-paginated-users'
export * from './users/set-user-role'

// CATEGORIES
export * from './category/get-categories'