import axios from "axios";
import {
    REGISTER_REQUEST, REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    CLEAR_AUTH_ERROR, CREATE_ADMIN_REQUEST, CREATE_ADMIN_SUCCESS, CREATE_ADMIN_FAILURE
} from "./ActionType";
import {jwtDecode} from "jwt-decode";
import {toast} from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = (userData, navigate) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/api/auth/register`, userData);
        if (data) {
            dispatch({ type: REGISTER_SUCCESS, payload: data });
        }

        if (data.message === "User registered successfully") {
            toast.success("Account Created Successfully!, Redirecting to Login");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }
    } catch (error) {
        const errorMessage = error.response?.data || "Server Down, Try Again Later.";
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

export const createAdmin = (adminData) => async (dispatch) => {
    dispatch({ type: CREATE_ADMIN_REQUEST });
    try {
        const jwt = localStorage.getItem("jwt");
        const { data } = await axios.post(`${API_BASE_URL}/api/auth/create-admin`, adminData, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });

        if (data.message === "Admin registered successfully") {
            toast.success(data.message);
            dispatch({ type: CREATE_ADMIN_SUCCESS, payload: data });
        } else {
            toast.error(data.message);
            dispatch({ type: CREATE_ADMIN_FAILURE, payload: data.message });
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to create admin.";
        toast.error(errorMessage);
        dispatch({ type: CREATE_ADMIN_FAILURE, payload: errorMessage });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("jwt");
    dispatch({ type: LOGOUT });
};

export const clearAuthError = () => (dispatch) => {
    dispatch({ type: CLEAR_AUTH_ERROR });
};