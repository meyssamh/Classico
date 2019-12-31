import * as actionTypes from '../actions/actionTypes';

const initialState = {
    email: '',
    password: '',
    loading: true,
    error: false,
    errorMessage: '',
    redirect: false,
    redirectPath: ''
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REDIRECT_HANDLER_LOGIN:
            return {
                ...state,
                redirect: false,
                redirectPath: ''
            }
        case actionTypes.LOADING_HANDLER_LOGIN:
            return {
                ...state,
                loading: false
            }
        case actionTypes.SUBMIT_LOGIN_START:
            return {
                ...state,
                email: action.email,
                password: action.password,
                loading: true
            }
        case actionTypes.SUBMIT_LOGIN_SUCCESS:
            const email = action.data.data.email;
            const userId = action.data.data.userId;
            const games = action.data.data.games;
            const token = action.data.data.token;
            localStorage.setItem('email', email);
            localStorage.setItem('userId', userId);
            localStorage.setItem('games', games);
            localStorage.setItem('token', token);
            localStorage.setItem('isLogedin', true);
            return {
                ...state,
                redirect: true,
                redirectPath: 'library'
            }
        case actionTypes.SUBMIT_LOGIN_FAIL:
            if (action.data.status === 404) {
                return {
                    ...state,
                    redirect: true,
                    redirectPath: '404'
                }
            }
            if (action.data.status === 500) {
                return {
                    ...state,
                    redirect: true,
                    redirectPath: '500'
                }
            }
            return {
                ...state,
                error: true,
                errorMessage: action.data.message,
                loading: false
            }
        case actionTypes.SUBMIT_ERROR_LOGIN:
            return {
                ...state,
                error: true,
                errorMessage: 'Incorrect Password',
                loading: false
            }
        case actionTypes.ERROR_HANDLER_LOGIN:
            return {
                ...state,
                error: false,
                errorMessage: '',
                loading: false
            }
        case actionTypes.CANCEL_HANDLER_LOGIN:
            return {
                ...state,
                redirect: true
            }
        default:
            return state;
    }
}

export default loginReducer;