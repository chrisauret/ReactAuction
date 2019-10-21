import React from 'react';
//import { Route } from 'react-router';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Home from './components/Home';
import theme from './components/Theme';
import Header from './components/Header';
import { Grid, Container } from '@material-ui/core';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default () => (
    <MuiThemeProvider theme={theme}>
        <Header />
        <Container maxWidth="md">
            <Route exact path='/' component={Home} />
        </Container>
    </MuiThemeProvider>
);