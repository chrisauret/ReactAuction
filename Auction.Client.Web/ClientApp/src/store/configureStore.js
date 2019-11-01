import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import setAuthorisationToken from '../utils/setAuthorisationToken';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { itemReducer } from '../store/reducers/itemReducer';
import { userReducer } from "../store/reducers/userReducer";
import { appReducer } from "../store/reducers/appReducer";
import { sessionReducer } from "../store/reducers/sessionReducer";
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

    setAuthorisationToken(localStorage.jwtToken);

    // this or combineReducers in rootReducer.js?
    const rootReducer = combineReducers({
        appReducer,
        itemReducer,
        userReducer,
        sessionReducer,
        routerReducer
    });

    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
}