import jwt from 'jsonwebtoken';
import {
    setUserSignedIn
} from '../actions/types'

export const setUserSignedIn = (user) => async (dispatch, getState) => {
    return {
        type: setUserSignedIn,
        payload: user
    }
}
