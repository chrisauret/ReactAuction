import {
    SET_USER_SIGNED_IN,
    SET_USER_SIGNED_OUT
} from '../actions/types'

export const userSignedIn = (user) => async (dispatch, getState) => {
    dispatch({ type: SET_USER_SIGNED_IN, payload: user})
}

export const userSignedOut = (user) => async (dispatch, getState) => {
    dispatch({ type: SET_USER_SIGNED_OUT });
    localStorage.removeItem('jwtToken');
}