import {
    requestSignInUser,
    receiveSignInUser,
    requestSignUpUser,
    receiveSignUpUser,
    setUserSignedIn
} from '../actions/types'

export const requestSignUp = (user) => async (dispatch, getState) => {

    dispatch({ type: requestSignUpUser });

    const url = `api/Users/signup`;

    const data = JSON.stringify({
        ...user
    });

    fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: data
    })
        .then(response => response.json())
        .then(user => {
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

    fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: data
    })
        .then(response => response.json())
        .then(user => {
            dispatch({ type: receiveSignInUser, payload: user });
            dispatch({ type: setUserSignedIn, payload: user })
            localStorage.setItem('jwtToken', user.token)
        });
};