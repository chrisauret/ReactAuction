import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/Items';
import Item from './Item';

class Home extends Component {

    componentDidMount() {
        this.props.requestItems();
    }

    render() {

        return (
            <div>
                {
                    this.props.items.items.map((item) => {
                        return (
                            <Item key={item.id} item={item} />
                        )
                    })
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);
