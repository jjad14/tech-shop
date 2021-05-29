import * as types from '../constants/productTypes';

const initialState = {
    products: [],
    topProducts: [],
    product: { reviews: []},
    brands: [],
    categories: [],
    loading: false,
    loadingTop: false,
    loadingFilter: false,
    productCreated: false,
    productUpdated: false,
    productDeleted: false,
    reviewCreated: false,
    pages: null,
    page: null,
};

const reducer = (state= initialState, action) => {
    switch (action.type) {
        case types.GET_PRODUCTS_START:
        case types.GET_PRODUCT_DETAILS_START:
        case types.PRODUCT_CREATE_REVIEW_START:
            return {
                ...state,
                loading: true
            };
        case types.GET_PRODUCTS_BRANDS_START:
        case types.GET_PRODUCTS_CATEGORY_START:
            return {
                ...state,
                loadingFilter: true
            };
        case types.PRODUCT_TOP_START:
            return {
                ...state,
                topProducts: [],
                loadingTop: true 
            };
        case types.PRODUCT_UPDATE_START:
            return {
                ...state,
                loading: true,
                productUpdated: false,
            };
        case types.PRODUCT_DELETE_START:
            return {
                ...state,
                loading: true,
                productDeleted: false
            };
        case types.PRODUCT_CREATE_START:
            return {
                ...state,
                loading: true,
                productCreated: false
            };
        case types.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload.products,
                pages: action.payload.pages,
                page: action.payload.page,
                loading: false
            };
        case types.GET_PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                product: action.payload, 
                loading: false
            };
        case types.PRODUCT_CREATE_SUCCESS:
            return {
                ...state,
                product: action.payload,
                productCreated: true,
                loading: false
            };
        case types.PRODUCT_UPDATE_SUCCESS:
            return {
                ...state,
                product: action.payload, 
                productUpdated: true
            };
        case types.PRODUCT_DELETE_SUCCESS:
            return {
                ...state,
                productDeleted: true,
                loading: false
            };
        case types.PRODUCT_CREATE_REVIEW_SUCCESS:
            return {
                ...state,
                reviewCreated: true,
                loading: false
            };
        case types.PRODUCT_TOP_SUCCESS:
            return {
                ...state,
                topProducts: action.payload,
                loadingTop: false
            };
        case types.GET_PRODUCTS_BRANDS_SUCCESS:
            return {
                ...state,
                brands: action.payload,
                loadingFilter: false
            };
        case types.GET_PRODUCTS_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                loadingFilter: false
            };
        case types.PRODUCT_CREATE_RESET:
            return {
                ...state,
                productCreated: false
            };
        case types.PRODUCT_UPDATE_RESET:
            return {
                ...state,
                product: { reviews: []},
                productUpdated: false
            };
        case types.PRODUCT_CREATE_REVIEW_RESET:
            return {
                ...state,
                reviewCreated: false
            };
        case types.GET_PRODUCTS_FAIL:
        case types.GET_PRODUCT_DETAILS_FAIL:
        case types.PRODUCT_UPDATE_FAIL:
        case types.PRODUCT_DELETE_FAIL:
        case types.PRODUCT_CREATE_FAIL:
        case types.PRODUCT_CREATE_REVIEW_FAIL:
            return {
                ...state,
                loading: false
            }; 
        case types.GET_PRODUCTS_CATEGORY_FAIL:
        case types.GET_PRODUCTS_BRANDS_FAIL:
            return {
                ...state,
                loadingFilter: false
            };
        case types.PRODUCT_TOP_FAIL:
            return {
                ...state,
                loadingTop: false
            }; 
        case types.CLEAR_PRODUCT_DETAILS:
            return {
                ...state,
                product: { reviews: []}
            }; 
        default:
            return state;
    }
};

export default reducer;