import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/Items';
import Item from './Item';

class Home extends Component {

    constructor(props) {
        super(props);

        props.requestItems();
    }

    render() {
        return (
            <div className="row">
                {
                    this.props.items.map((item, index) => {
                        return (
                            <Item key={item.id} item={item} placeBid={this.props.handlePlaceBid} />
                        )
                    })
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.items;
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);
