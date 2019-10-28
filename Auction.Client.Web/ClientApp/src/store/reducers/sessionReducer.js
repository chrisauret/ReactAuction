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

        console.log("heyy", action);

        return {
            isAuthenticated: action.payload && true,
            user: action.payload
        };
    }

    return state;
}