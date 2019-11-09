import {
    REQUEST_SIGN_IN_USER,
    RECEIVE_SIGN_IN_USER,
    REQUEST_SIGN_UP_USER,
    RECEIVE_SIGN_UP_USER
} from '../actions/types'

const initialState = {
    user: {},
    isLoading: false
};

export const userReducer = (state, action) => {
    state = state || initialState;

    // SignIn
    if (action.type === REQUEST_SIGN_IN_USER) {

        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === RECEIVE_SIGN_IN_USER) {

        return {
            ...state,
            isLoading: false,
        }
    }

    // SignUp
    if (action.type === REQUEST_SIGN_UP_USER) {

        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === RECEIVE_SIGN_UP_USER) {

        return {
            ...state,
            user: { ...action.payload },
            isLoading: false
        }
    }

    return state;
}