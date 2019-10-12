import { combineReducers } from "redux";
import { itemReducer } from "./itemReducer";

export const reducers = () => {
    combineReducers({
        items: itemReducer
    })
};