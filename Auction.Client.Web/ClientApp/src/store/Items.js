const requestItemsType = 'REQUEST_ITEMS';
const receiveItemsType = 'RECEIVE_ITEMS';
const requestItemTpe = 'REQUEST_ITEM';
const receiveItemType = 'RECEIVE_ITEM';
const requestUpdateItemType = 'REQUEST_UPDATE_ITEM';
const receiveUpdateItemType = 'RECEIVE_UPDATE_ITEM';

const initialState = {
    userId: 9099,
    items: [],
    isLoading: false
};

export const actionCreators = {
    requestItems: () => async (dispatch, getState) => {

        //dispatch({ type: requestItemsType });

        const url = `api/Home/GetItems`;
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                dispatch({ type: receiveItemsType, payload: data })
            });
    },

    requestItem: (id) => async (dispatch, getState) => {
        dispatch({ type: requestItemTpe });

        const url = `api/Home/GetItem/${id}`;
        const response = await fetch(url);
        const item = await response.json();

        dispatch({ type: receiveItemType, payload: item });
    },

    placeBid: (item) => async (dispatch, getState) => {

        dispatch({ type: requestUpdateItemType });

        let state = getState();

        //console.log("placeBid item", item)
        //console.log("placeBid state", state)

        const baseURL = "api/home/placebid";

        const data = JSON.stringify({
            ...item,
            userId: state.items.userId
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
                //console.log("Response: updatedItem", item);
                dispatch({ type: receiveUpdateItemType, payload: item })
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

        return {
            ...state,
            items: action.payload,
            isLoading: false,
        }
    }

    if (action.type === requestUpdateItemType) {

        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveUpdateItemType) {

        let items = [...state.items];
        let objIndex = items.findIndex((obj => obj.id === action.payload.id));
        items[objIndex] = action.payload;

        return {
            ...state,
            items,
            isLoading: false
        }
    }

    return state;
}