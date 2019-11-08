import {
    setUserSignedIn,
    setUserSignedOut
} from '../actions/types'

const initialState = {
    isAuthenticated: false,
    user: {}
};

export const sessionReducer = (state, action) => {

    state = state || initialState;

    if (action.type === setUserSignedIn) {

        return {
            isAuthenticated: action.payload && true,
            user: action.payload
        };
    }

    if (action.type === setUserSignedOut) {

        return {
            isAuthenticated: false,
            user: null
        };
    }

    return state;
}