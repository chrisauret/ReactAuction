import {
    setUserSignedIn,
    setUserSignedOut
} from '../actions/types'

export const userSignedIn = (user) => async (dispatch, getState) => {
    dispatch({ type: setUserSignedIn, payload: user})
}

export const userSignedOut = (user) => async (dispatch, getState) => {
    console.log("signing out")
    dispatch({ type: setUserSignedOut });
    localStorage.removeItem('jwtToken');
}