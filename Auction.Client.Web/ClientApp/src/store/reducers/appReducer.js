import {
    setUserSignedIn,
    setUserSignedOut,
} from '../actions/types'

const initialState = {
    isAuthenticated: false,
    user: {}
};

export const appReducer = (state, action) => {
    state = state || initialState;

    if (action.type === setUserSignedIn) {

        return {
            ...state,
            user: { ...action.payload }
        };
    }

    if (action.type === setUserSignedOut) {

        return {
            ...state,
            user: null
        };
    }

    return state;
}