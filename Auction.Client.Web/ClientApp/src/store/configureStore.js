import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import setAuthorisationToken from '../utils/setAuthorisationToken';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { itemReducer } from '../store/reducers/itemReducer';
import { userReducer } from "../store/reducers/userReducer";
import { appReducer } from "../store/reducers/appReducer";
import { sessionReducer } from "../store/reducers/sessionReducer";
//import { rootReducer } from '../store/reducers/rootReducer';

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        //console.log("Saving the following state: ", serializedState);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        console.log("ERROR saving state", err);
    }
}

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

    const persistedState = loadState();
    //debugger;
    //console.log("persistedState", persistedState)

    const rootReducer = combineReducers({
        sessionReducer,
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