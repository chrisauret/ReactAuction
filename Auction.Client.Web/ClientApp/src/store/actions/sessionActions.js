import jwt from 'jsonwebtoken';
import {
    setCurrentUserSession
} from '../actions/types'


export const setCurrentUser = (user) => async (dispatch, getState) => {
    return {
        type: setCurrentUserSession,
        payload: user
    }
}
