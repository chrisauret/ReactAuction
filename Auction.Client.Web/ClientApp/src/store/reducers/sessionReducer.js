import {
    SET_USER_SIGNED_IN,
    SET_USER_SIGNED_OUT
} from '../actions/types'

const initialState = {
    isAuthenticated: false,
    user: {}
};

export const session = (state, action) => {

    state = state || initialState;

    if (action.type === SET_USER_SIGNED_IN) {

        return {
            isAuthenticated: action.payload && true,
            user: action.payload
        };
    }

    if (action.type === SET_USER_SIGNED_OUT) {

        return {
            isAuthenticated: false,
            user: null
        };
    }

    return state;
}