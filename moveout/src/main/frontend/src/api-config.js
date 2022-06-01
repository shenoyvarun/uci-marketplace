const backendHost = 'http://localhost:8082';
const paymentHost = 'http://localhost:4000';

export const LOGIN_USER = backendHost+'/loginApi';
export const REGISTER_USER = backendHost+'/registerApi';
export const ADD_PRODUCT = backendHost+'/addProduct';
export const GET_PRODUCTS = backendHost+'/getAllProducts';
export const GET_PRODUCTS_BY_NAME = backendHost+'/getProductsByName';
export const GET_SELLER_BY_EMAIL = backendHost+'/getSellerDetails';
export const GET_PRODUCTS_BY_USER = backendHost+'/getUserProducts';
export const DELETE_PRODUCT = backendHost+'/deleteProduct';
export const MARK_AS_SOLD = backendHost+'/markAsSold';
export const GET_PRODUCTS_BY_USER_SOLD = backendHost+'/getSoldProductsOfUser';
export const CHECKOUT = paymentHost+'/checkout';
