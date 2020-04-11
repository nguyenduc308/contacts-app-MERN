import React,{ useReducer } from 'react'
import AuthContext from './authContext'
import authReducer from './authReducer'
import callApi from '../../utils/callApi'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_ERROR,
    CLEAR_ERRORS,
    LOGOUT
} from '../types'

const AuthState = props => {
    const initState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        loading: true,
        error: null,
    }

    const [state, dispatch] = useReducer(authReducer, initState)
    
    //Load User
    const loadUser = async () => {
        try {
            const res = await callApi(localStorage.token).get('/u/auth')
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }
    //Register
    const register = async (data) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await callApi().post('/u/register', data, config)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            loadUser()
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.error
            })
        }
    }
    //Login
    const login = async (data) => {
        try {
            const res = await callApi().post('/u/login', data)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            loadUser()
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.error
            })
        }
    }
    //Logout
    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    }
    //Clear Errors
    const clearError = () => {
        dispatch({
            type: CLEAR_ERRORS
        })
    }
return (
    <AuthContext.Provider
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            loadUser,
            register,
            login,
            logout,
            clearError
        }}
    >
        {props.children}
    </AuthContext.Provider>
)
}

export default AuthState;
