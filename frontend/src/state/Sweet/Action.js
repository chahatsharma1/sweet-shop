import axios from "axios";
import * as types from "./ActionType";
import { toast } from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => {
    const jwt = localStorage.getItem("jwt");
    return { "Authorization": `Bearer ${jwt}` };
};

export const getAllSweets = () => async (dispatch) => {
    dispatch({ type: types.GET_ALL_SWEETS_REQUEST });

    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/sweets`, {
            headers: getAuthHeader()
        });
        dispatch({ type: types.GET_ALL_SWEETS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: types.GET_ALL_SWEETS_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};
export const searchSweets = (params) => async (dispatch) => {
    dispatch({ type: types.SEARCH_SWEETS_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/sweets/search`, {
            params,
            headers: getAuthHeader()
        });
        dispatch({ type: types.SEARCH_SWEETS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: types.SEARCH_SWEETS_FAILURE, payload: error.message });
    }
};


export const purchaseSweet = (sweetId, quantity) => async (dispatch) => {
    dispatch({ type: types.PURCHASE_SWEET_REQUEST });
    try {
        const { data } = await axios.post(
            `${API_BASE_URL}/api/sweets/${sweetId}/purchase?quantity=${quantity}`,
            null,
            { headers: getAuthHeader() }
        );
        dispatch({ type: types.PURCHASE_SWEET_SUCCESS, payload: data });
        toast.success(`Successfully purchased ${data.name}!` , {duration: 2000} );
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Purchase failed.";
        dispatch({ type: types.PURCHASE_SWEET_FAILURE, payload: errorMessage });
        toast.error(errorMessage);
    }
};

export const addSweet = (sweetData) => async (dispatch) => {
    dispatch({ type: types.ADD_SWEET_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/api/sweets`, sweetData, { headers: getAuthHeader() });
        dispatch({ type: types.ADD_SWEET_SUCCESS, payload: data });
        toast.success("Sweet added successfully!");
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to add sweet.";
        dispatch({ type: types.ADD_SWEET_FAILURE, payload: errorMessage });
        toast.error(errorMessage);
    }
};

export const updateSweet = (sweetId, sweetData) => async (dispatch) => {
    dispatch({ type: types.UPDATE_SWEET_REQUEST });
    try {
        const { data } = await axios.put(`${API_BASE_URL}/api/sweets/${sweetId}`, sweetData, { headers: getAuthHeader() });
        dispatch({ type: types.UPDATE_SWEET_SUCCESS, payload: data });
        toast.success("Sweet updated successfully!");
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to update sweet.";
        dispatch({ type: types.UPDATE_SWEET_FAILURE, payload: errorMessage });
        toast.error(errorMessage);
    }
};

export const deleteSweet = (sweetId) => async (dispatch) => {
    dispatch({ type: types.DELETE_SWEET_REQUEST });
    try {
        await axios.delete(`${API_BASE_URL}/api/sweets/${sweetId}`, { headers: getAuthHeader() });
        dispatch({ type: types.DELETE_SWEET_SUCCESS, payload: sweetId });
        toast.success("Sweet deleted successfully!");
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to delete sweet.";
        dispatch({ type: types.DELETE_SWEET_FAILURE, payload: errorMessage });
        toast.error(errorMessage);
    }
};

export const restockSweet = (sweetId, quantity) => async (dispatch) => {
    dispatch({ type: types.RESTOCK_SWEET_REQUEST });
    try {
        const { data } = await axios.post(
            `${API_BASE_URL}/api/sweets/${sweetId}/restock?quantity=${quantity}`,
            null,
            { headers: getAuthHeader() }
        );
        dispatch({ type: types.RESTOCK_SWEET_SUCCESS, payload: data });
        toast.success(`${data.name} has been restocked!`);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Restock failed.";
        dispatch({ type: types.RESTOCK_SWEET_FAILURE, payload: errorMessage });
        toast.error(errorMessage);
    }
};