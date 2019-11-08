import {
    setUserSignedIn,
    setUserSignedOut
} from '../actions/types'

export const userSignedIn = (user) => async (dispatch, getState) => {
    return {
        type: setUserSignedIn,
        payload: user
    }
}

export const userSignedOut = (user) => async (dispatch, getState) => {

    console.log("Signing out");

    dispatch({ type: setUserSignedOut });

}
