import axios from "axios";
import {REGISTER_REQUEST, REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    CLEAR_AUTH_ERROR
} from "./ActionType";
import {jwtDecode} from "jwt-decode";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/api/auth/register`, userData);
        if (data) {
            dispatch({ type: REGISTER_SUCCESS, payload: data });
        }
    } catch (error) {
        const errorMessage = error.response?.data || "An unknown error occurred.";
        dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
    }
};

export const login = (loginData, selectedRole, navigate) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/api/auth/login`, loginData);

        if (data.token) {
            const decodedToken = jwtDecode(data.token);
            const actualRole = decodedToken.role;

            if (actualRole === selectedRole) {
                localStorage.setItem("jwt", data.token);
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: { token: data.token, role: actualRole }
                });

                if (navigate) {
                    if (actualRole === "ADMIN") {
                        navigate("/admin/dashboard");
                    } else {
                        navigate("/dashboard");
                    }
                }
            } else {
                const errorMessage = `Please Select The Correct Role`;
                dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
            }
        }
    } catch (error) {
        const errorMessage = error.response?.data || "Invalid credentials.";
        dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("jwt");
    dispatch({ type: LOGOUT });
};

export const clearAuthError = () => (dispatch) => {
    dispatch({ type: CLEAR_AUTH_ERROR });
};