import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Home from './components/Home';
import theme from './components/Theme';
import Header from './components/Header';
import Login from './components/Login';
import { Container } from '@material-ui/core';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


export default () => (
    <MuiThemeProvider theme={theme}>
        <Header />
        <Container maxWidth="lg">
            <Route exact path='/' component={Home}></Route>
            <Route path='/Login' component={Login} ></Route>
        </Container>
    </MuiThemeProvider>
);