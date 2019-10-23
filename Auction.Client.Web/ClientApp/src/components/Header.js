﻿import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/styles';
import { Link } from "react-router-dom";

const styles = theme => {
    return {
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        link: {
            color: theme.palette.secondary.main,
            textDecoration: 'none'
        }
    };
};

class Header extends Component {

    render() {
        const { classes } = this.props;

        return (
            <AppBar position="static">
                <Toolbar>

                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" className={classes.title}>
                        Auction
                     </Typography>

                    <Link to="/SignIn" className={classes.link}>
                        <Button color="inherit">
                            Login
                        </Button>
                    </Link>

                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(Header);