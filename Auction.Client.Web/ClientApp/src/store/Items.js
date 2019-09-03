const requestItemsType = 'REQUEST_ITEMS';
const receiveItemsType = 'RECEIVE_ITEMS';
const requestItemTpe = 'REQUEST_ITEM';
const receiveItemType = 'RECEIVE_ITEM';
const updateItemType = 'UPDATE_ITEM';

const initialState = { items: [], item: {}, currId: 0, isLoading: false };

let allitems = [];
let currentItem = {};

export const actionCreators = {
    requestItems: () => async (dispatch, getState) => {

        dispatch({ type: requestItemsType });

        const url = `api/Home/GetItems`;
        const response = await fetch(url);
        const allitems = await response.json();

        dispatch({ type: receiveItemsType, allitems });
    },

    requestItem: (id) => async (dispatch, getState) => {
        dispatch({ type: requestItemTpe });

        const url = `api/Home/GetItem/${id}`;
        const response = await fetch(url);
        const item = await response.json();

        dispatch({ type: receiveItemType, item });
    },

    updateItem: (item) => async (dispatch, getState) => {
        const baseURL = "/api/Home";

        const data = JSON.stringify({
            itemId: item.id, userId: 123
        });

        const fetchTask = fetch(baseURL, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: data
        })
        .then((data) => {
            dispatch({ type: updateItemType, item: data });
        });
    },
}

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestItemsType) {

        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveItemsType) {

        console.log("action", action);
        console.log("state", state);

        allitems = action.allitems;

        return {
            ...state,
            items: allitems,
            isLoading: false
        };
    }

    if (action.type === updateItemType) {

        return {
            ...state,
            isLoading: false
        };
    }

    return state;
}