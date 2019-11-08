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

export const userReducer = (state, action) => {
    state = state || initialState;

    // SignIn
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
            user: { ...action.payload },
            isLoading: false
        }
    }

    return state;
}