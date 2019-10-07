import React, { Component, Fragment } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Items';

class Home extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Fragment>
                            {this.props.children}
                        </Fragment>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(
    state => state.items,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);
