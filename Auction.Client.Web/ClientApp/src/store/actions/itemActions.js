import {
    requestItemsType,
    receiveItemsType,
    requestUpdateItemType,
    receiveUpdateItemType,
    requestItemTpe,
    receiveItemType
} from '../actions/types'

export const requestItems = () => async (dispatch, getState) => {

    dispatch({ type: requestItemsType });

    const url = `api/Home/GetItems`;
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            dispatch({ type: receiveItemsType, payload: data })
        });
};

export const requestItem = (id) => async (dispatch, getState) => {
    dispatch({ type: requestItemTpe });

    const url = `api/Home/GetItem/${id}`;
    const response = await fetch(url);
    const item = await response.json();

    dispatch({ type: receiveItemType, payload: item });
};

export const placeBid = (item) => async (dispatch, getState) => {

    dispatch({ type: requestUpdateItemType });

    let state = getState();
    const baseURL = "api/home/placebid";

    const data = JSON.stringify({
        ...item,
        userId: state.itemReducer.userId
    });

    fetch(baseURL, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: data
    })
        .then(response => response.json())
        .then(item => {
            dispatch({ type: receiveUpdateItemType, payload: item })
        });
};