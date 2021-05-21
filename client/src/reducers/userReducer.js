import * as types from '../constants/userTypes';

export const initialUserState = {
    userInfo: null,
    users: [],
    loading: false,
    userDeleted: false,
    updated: null
};

const reducer = (state=initialUserState, action) => {
    switch (action.type) {
        case types.USER_LOGIN_START:
        case types.USER_REGISTER_START:
        case types.USER_DETAILS_START:
        case types.USER_UPDATE_PROFILE_START:
        case types.USER_LIST_START:
            return {
                ...state, 
                loading: true,
            };
        case types.USER_DELETE_START:
            return {
                ...state,
                loading: true,
                userDeleted: false
            };
        case types.USER_LOGIN_SUCCESS:
        case types.USER_REGISTER_SUCCESS:
        case types.USER_DETAILS_SUCCESS:
            return {
                ...state, 
                loading: false, 
                userInfo: action.payload, 
            };
        case types.USER_UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                userInfo: action.payload,
                updated: true,
                loading:false
            };
        case types.USER_LIST_SUCCESS:
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case types.USER_DELETE_SUCCESS:
            return {
                ...state,
                userDeleted: true,
                loading: false
            };
        case types.USER_LOGIN_FAIL:
        case types.USER_REGISTER_FAIL:
        case types.USER_UPDATE_PROFILE_FAIL:
        case types.USER_LIST_FAIL:
        case types.USER_DETAILS_FAIL:
        case types.USER_DELETE_FAIL:
            return {
                ...state, 
                loading: false, 
            };
        case types.USER_LOGOUT:
            return initialUserState;
        default:
            return state;
    }
};

export default reducer;