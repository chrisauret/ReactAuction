import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/Items';
import Item from './Item';

class Home extends Component {

    componentDidMount() {

        console.log("componentdidmount this.props", this.props);
        this.props.requestItems();
    } 

    render() {

        return (
            <div className="row">
                {
                    //this.props.items.map((item) => {
                    //    return (
                    //        <Item key={item.id} item={item} bidAmount={0} />
                    //    )
                    //})
                }
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {

    return state;

    //console.log("state ms2p", state);
    ////console.log("ownProps ms2p", ownProps);

    //let xxx ={
    //    ...state,
    //    ...ownProps
    //}

    //console.log("xxx", xxx);

    //return xxx;
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);
