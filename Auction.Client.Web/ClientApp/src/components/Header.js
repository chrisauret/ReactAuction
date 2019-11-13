import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/styles';
import * as actionCreators from '../store/actions/sessionActions'

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

    constructor(props) {
        super(props);

        this.handleSignOutClick = this.handleSignOutClick.bind(this);
    }

    guestLinks() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Link to="/SignUp" className={classes.link}>
                    <Button color="inherit">
                        Sign Up
                    </Button>
                </Link>
                <Link to="/SignIn" className={classes.link}>
                    <Button color="inherit">
                        Sign In
                    </Button>
                </Link>
            </Fragment>
        )
    }

    userLinks() {
        const { classes } = this.props;
        return (
            <Link to="/" className={classes.link}>
                <Button onClick={this.handleSignOutClick} color="inherit">
                    Sign Out
                    </Button>
            </Link>
        )
    }

    handleSignOutClick(e) {
        e.preventDefault();
        this.props.userSignedOut();
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
                        Catalogue Manager
                     </Typography>

                    {this.props.session.isAuthenticated ? this.userLinks() : this.guestLinks()}

                </Toolbar>
            </AppBar>
        )
    }
}

//Header.propTypes = {
//    appReducer: React.propTypes.object.isRequired
//}

function mapStateToProps(state) {
    return {
        session: state.session
    };
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