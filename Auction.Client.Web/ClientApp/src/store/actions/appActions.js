import {
    setUserSignedIn,
    setUserSignedOut
} from '../actions/types'

export const SetUserSignIn = (user) => async (dispatch, getState) => {
    dispatch({ type: setUserSignedIn, payload: user })
};

export const setUserSignOut = () => async (dispatch, getState) => {
    dispatch({ type: setUserSignedOut, payload: null })
};