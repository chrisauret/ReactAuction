import React from 'react';
import { Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Home from './components/Home';
import theme from './components/Theme';
import Header from './components/Header';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

export default () => (
    <MuiThemeProvider theme={theme}>
        <Header />
        <Container maxWidth="lg">
            <Switch>
                <Route exact path='/' component={Home}></Route>
                <Route path='/SignIn' component={SignIn}></Route>
                <Route path='/SignUp' component={SignUp}></Route>
            </Switch>
        </Container>
    </MuiThemeProvider>
);