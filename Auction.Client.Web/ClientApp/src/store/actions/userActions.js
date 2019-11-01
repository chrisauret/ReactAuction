import setAuthorisationToken from '../../utils/setAuthorisationToken';
import axios from 'axios';

import jwt from 'jsonwebtoken';
import {
    requestSignInUser,
    receiveSignInUser,
    requestSignUpUser,
    receiveSignUpUser,
    setUserSignedIn,
    setCurrentUserSession
} from '../actions/types'

export const requestSignUp = (user) => async (dispatch, getState) => {

    dispatch({ type: requestSignUpUser });

    const url = `api/Users/signup`;

    const data = JSON.stringify({
        ...user
    });

    const headers = { 'Content-Type': 'application/json' };

    axios.post(url, data, { headers: headers }).then(res => {
        const user = res.data;

        dispatch({ type: receiveSignUpUser, payload: user });
        dispatch({ type: setUserSignedIn, payload: user })
    });
};

export const requestSignIn = (user) => async (dispatch, getState) => {

    dispatch({ type: requestSignInUser });

    const url = `api/Users/Authenticate`;

    const data = JSON.stringify({
        ...user
    });

    const headers = { 'Content-Type': 'application/json' };

    axios.post(url, data, { headers: headers }).then(res => {
        const user = res.data;

        dispatch({ type: receiveSignInUser, payload: user });
        dispatch({ type: setUserSignedIn, payload: user })

        localStorage.setItem('jwtToken', user.token);
        setAuthorisationToken(user.token);

        dispatch({ type: setCurrentUserSession, payload: jwt.decode(user.token) });
    });
};