import * as types from '../constants/userTypes';

export const initialUserState = {
    userInfo: null,
    error: null,
    loading: false,
    updated: null
};

const reducer = (state=initialUserState, action) => {
    switch (action.type) {
        case types.USER_LOGIN_START:
        case types.USER_REGISTER_START:
        case types.USER_DETAILS_START:
        case types.USER_UPDATE_PROFILE_START:
            return {
                ...state, 
                loading: true 
            };
        case types.USER_LOGIN_SUCCESS:
        case types.USER_REGISTER_SUCCESS:
        case types.USER_DETAILS_SUCCESS:
            return {
                ...state, 
                loading: false, 
                userInfo: action.payload, 
                error: null 
            };
        case types.USER_UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                userInfo: action.payload,
                updated: true,
                error: null,
                loading:false
            };
        case types.USER_LOGIN_FAIL:
        case types.USER_REGISTER_FAIL:
        case types.USER_UPDATE_PROFILE_FAIL:
            return {
                ...state, 
                loading: false, 
                error: action.payload 
            };
        case types.USER_LOGOUT:
        case types.USER_DETAILS_FAIL:
            return initialUserState;
        default:
            return state;
    }
};

export default reducer;