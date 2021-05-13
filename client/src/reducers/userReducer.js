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
            return {
                ...state, 
                loading: true 
            };
        case types.USER_LOGIN_SUCCESS:
            return {
                ...state, 
                loading: false, 
                userInfo: action.payload, 
                error: null 
            };
        case types.USER_LOGIN_FAIL:
            return {
                ...state, 
                loading: false, 
                error: action.payload 
            };
        case types.USER_LOGOUT:
            return {
                userInfo: null,
                error: null,
                loading: false,
                updated: null
            };
        default:
            return state;
    }
};

export default reducer;