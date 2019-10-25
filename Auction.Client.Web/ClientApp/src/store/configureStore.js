import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { itemReducer } from '../store/reducers/itemReducer';
import { userReducer } from "../store/reducers/userReducer";
import { appReducer } from "../store/reducers/appReducer";
//import { rootReducer } from '../store/reducers/rootReducer';

export default function configureStore(history, initialState) {

    const middleware = [
        thunk,
        routerMiddleware(history)
    ];

    // In development, use the browser's Redux dev tools extension if installed
    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
        enhancers.push(window.devToolsExtension());
    }

    // this or combineReducers in rootReducer.js?
    const rootReducer = combineReducers({
        appReducer,
        itemReducer,
        userReducer,
        routerReducer
    });

    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
}