import {
    setUserSignedIn,
    setUserSignedOut
} from '../actions/types'

const initialState = {
    user: {}
};

export const appReducer = (state, action) => {
    state = state || initialState;

    if (action.type === setUserSignedIn) {

        console.log("signing in");

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