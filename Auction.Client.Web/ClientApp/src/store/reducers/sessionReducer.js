import {
    setCurrentUserSession,
} from '../actions/types'

const initialState = {
    isAuthenticated: false,
    user: {}
};

export const sessionReducer = (state, action) => {

    state = state || initialState;

    if (action.type === setCurrentUserSession) {

        return {
            isAuthenticated: action.payload && true,
            user: action.payload
        };
    }

    return state;
}