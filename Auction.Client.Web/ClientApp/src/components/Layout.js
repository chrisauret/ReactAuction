import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Items';

class Home extends Component {
    render() {
        return (
            <div>
                <Container>
                    {this.props.children}
                </Container>
            </div>
        )
    }
}

export default connect(
    state => state.items,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);
