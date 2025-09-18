import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    CLEAR_AUTH_ERROR
} from "./ActionType";

const jwt = localStorage.getItem("jwt");

const initialState = {
    jwt: jwt || null,
    isLoading: false,
    error: null,
    user: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
            return { ...state, isLoading: true, error: null };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                jwt: action.payload.jwt,
                user: action.payload.user
            };

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case LOGOUT:
            return { ...initialState, jwt: null };

        case CLEAR_AUTH_ERROR:
            return { ...state, error: null };

        default:
            return state;
    }
};