import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/Items';
import Item from './Item';

class Home extends Component {

    componentDidMount() {
        //console.log("componentdidmount this.props", this.props);
        this.props.requestItems();
    } 

    render() {

        return (
            <div className="row">
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

    //console.log("state ms2p", state);

    return state;
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);
