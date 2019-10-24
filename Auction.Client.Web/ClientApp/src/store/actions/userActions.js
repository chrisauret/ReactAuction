import {
    requestSignInUser,
    receiveSignInUser,
    requestSignUpUser,
    receiveSignUpUser
} from '../actions/types'

export const requestSignUp = () => async (dispatch, getState) => {

    dispatch({ type: requestSignUpUser });

    const url = `api/Users/SignUp`;
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("type: ", receiveItemsType)
            dispatch({ type: receiveSignUpUser, payload: data })
        });
};

export const requestSignIn = () => async (dispatch, getState) => {

    dispatch({ type: requestSignInUser });

    const url = `api/Users/Authenticate`;
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("type: ", receiveItemsType)
            dispatch({ type: receiveSignInUser, payload: data })
        });
};