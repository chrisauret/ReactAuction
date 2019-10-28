import {
    setUserSignedIn,
    setUserSignedOut
} from './types'

export const setUserSignIn = (user) => async (dispatch, getState) => {
    dispatch({ type: setUserSignedIn, payload: user })
};

export const setUserSignOut = () => async (dispatch, getState) => {
    dispatch({ type: setUserSignedOut, payload: null })
};