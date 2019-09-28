import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/Items';
import Item from './Item';

class Home extends Component {

    state = {
        items: [],
        currentItem: {}
    }

    componentWillMount() {
        this.props.requestItems();
    }

    handlePlaceBid() {

    }

    render() {
        return (
            <div className="row">
                {this.props.items.map((item, index) => {
                    return (
                        <Item key={item.id} item={item} placeBid={this.props.handlePlaceBid} />
                    )
                })}
            </div>
        )
    }
}

export default connect(
    state => state.items,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);
