const requestItemsType = 'REQUEST_ITEMS';
const receiveItemsType = 'RECEIVE_ITEMS';
const requestItemTpe = 'REQUEST_ITEM';
const receiveItemType = 'RECEIVE_ITEM';
const updateItemType = 'UPDATE_ITEM';

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

        let state = getState();

        console.log("placeBid item", item)
        console.log("placeBid state", state)

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
                console.log("Response: updatedItem", item);
                dispatch({ type: updateItemType, payload: item })
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

        //console.log("action.payload", action.payload);

        let newState = {
            ...state,
            items: action.payload,
            isLoading: false,
        };
        //console.log("newState", newState);

        return newState;
    }

    if (action.type === updateItemType) {

        console.log("action state", state);
        console.log("action payload", action);

        let items = [...state.items];
        let objIndex = items.findIndex((obj => obj.id === action.payload.id));
        items[objIndex] = action.payload;

        //return Object.assign({}, state, {
        //    isLoading: false, 
        //    items
        //})

        return {
            ...state,
            isLoading: false,
            items
        }

        //console.log("action state", state);
        //console.log("action payload", action);
        ////return {};



        //return {
        //    userId: state.userId,
        //    items: items,
        //    isLoading: false
        //};
    }

    return state;
}