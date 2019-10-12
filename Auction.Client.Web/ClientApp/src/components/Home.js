import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actions/itemActions'
import Item from './Item';
import Grid from '@material-ui/core/Grid';

class Home extends Component {

    componentDidMount() {
        console.log("componentDidMount");
        this.props.requestItems();
    }

    render() {

        console.log("this.props", this.props)

        return (
            <Grid container justify="center" spacing={3} >
                {
                    this.props.items.items.map((item) => {
                        return <Item key={item.id} item={item} />
                    })
                }
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    console.log("state", state);
    return state;
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);
