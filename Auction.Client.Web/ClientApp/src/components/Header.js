import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/styles';
import { Link } from "react-router-dom";
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actions/itemActions'

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

    renderLoginContent() {

        console.log("Header render Props", this.props);

        const { classes } = this.props;

        if (!this.props.user.id) {
            return (
                <Link to="/SignIn" className={classes.link}>
                    <Button color="inherit">
                        Login
                    </Button>
                </Link>
            )
        } else {
            return (
                <Link to="/SignOut" className={classes.link}>
                    <Button color="inherit">
                        Sign Out
                    </Button>
                </Link>
            )
        }
    }
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

                    {this.renderLoginContent()}

                </Toolbar>
            </AppBar>
        )
    }
}

function mapStateToProps({ appReducer }) {
    console.log("Header:MapStateToProps:appReducer", appReducer);

    return appReducer;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

export default compose(
    withStyles(styles, {
        name: 'Header',
    }),
    connect(mapStateToProps, mapDispatchToProps),
)(Header);