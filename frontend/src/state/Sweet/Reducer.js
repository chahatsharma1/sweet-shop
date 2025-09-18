import * as types from "./ActionType";

const initialState = {
    sweets: [],
    isLoading: false,
    error: null,
};

export const sweetReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_SWEETS_REQUEST:
        case types.SEARCH_SWEETS_REQUEST:
        case types.PURCHASE_SWEET_REQUEST:
        case types.ADD_SWEET_REQUEST:
        case types.UPDATE_SWEET_REQUEST:
        case types.DELETE_SWEET_REQUEST:
        case types.RESTOCK_SWEET_REQUEST:
            return { ...state, isLoading: true, error: null };

        case types.GET_ALL_SWEETS_FAILURE:
        case types.SEARCH_SWEETS_FAILURE:
        case types.PURCHASE_SWEET_FAILURE:
        case types.ADD_SWEET_FAILURE:
        case types.UPDATE_SWEET_FAILURE:
        case types.DELETE_SWEET_FAILURE:
        case types.RESTOCK_SWEET_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case types.GET_ALL_SWEETS_SUCCESS:
        case types.SEARCH_SWEETS_SUCCESS:
            return { ...state, isLoading: false, sweets: action.payload };

        case types.ADD_SWEET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                sweets: [...state.sweets, action.payload],
            };

        case types.PURCHASE_SWEET_SUCCESS:
        case types.UPDATE_SWEET_SUCCESS:
        case types.RESTOCK_SWEET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                sweets: state.sweets.map(sweet =>
                    sweet.id === action.payload.id ? action.payload : sweet
                ),
            };

        case types.DELETE_SWEET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                sweets: state.sweets.filter(sweet => sweet.id !== action.payload),
            };

        default:
            return state;
    }
};