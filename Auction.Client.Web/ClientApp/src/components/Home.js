import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actions/itemActions'
import Item from './Item';
import Grid from '@material-ui/core/Grid';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/styles';

const styles = theme => {
    return {
        container: {
            marginTop: '10px',
        },
    };
};

class Home extends Component {

    componentDidMount() {
        this.props.requestItems();
    }

    render() {
        const { classes } = this.props;

        if (this.props.session.isAuthenticated) {
            return (
                <Grid container justify="center" spacing={3} className={classes.container} >
                    {
                        this.props.item.items.map((item) => {
                            return <Item key={item.id} item={item} />
                        })
                    }
                </Grid>
            )
        }

        return <h1>You can't see anything because you havent logged in</h1>
    }
}

function mapStateToProps(state) {
    return {
        item: state.item,
        session: state.session
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

export default compose(
    withStyles(styles, {
        name: 'container'
    }),
    connect(mapStateToProps, mapDispatchToProps)
)(Home);