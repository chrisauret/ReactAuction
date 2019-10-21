import React from 'react';
import { Route } from 'react-router';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Home from './components/Home';
import theme from './components/Theme';
import Header from './components/Header';
import { Grid } from '@material-ui/core';


const styles = {
        container: {
            marginTop: '35px',
        },
};

export default (styles) => (
    <MuiThemeProvider theme={theme}>
        <Header />
        <Grid container spacing={10} justify="center" className={styles.container}>
            <Route exact path='/' component={Home} />
        </Grid>
    </MuiThemeProvider>
);