import {
    requestSignInUser,
    receiveSignInUser,
    requestSignUpUser,
    receiveSignUpUser
} from '../actions/types'

const initialState = {
    user: {},
    isLoading: false
};

// SignIn
export const userReducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestSignInUser) {

        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveSignInUser) {

        return {
            ...state,
            isLoading: false,
        }
    }

// SignUp
    if (action.type === requestSignUpUser) {

        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveSignUpUser) {


        return {
            ...state,
            isLoading: false
        }
    }

    return state;
}