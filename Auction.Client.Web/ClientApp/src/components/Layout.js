import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Paper } from '@material-ui/core'
import { actionCreators } from '../store/Items';

class Home extends Component {

    render() {
        return (
            <Grid container spacing={2} justify="center" >
                <Fragment>
                    {this.props.children}
                </Fragment>
            </Grid>
        )
    }



    //render() {
    //    return (
    //        <Container>
    //            <Row>
    //                <Col>
    //                    <Fragment>
    //                        {this.props.children}
    //                    </Fragment>
    //                </Col>
    //            </Row>
    //        </Container>
    //    )
    //}
}

export default connect(
    state => state.items,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);
