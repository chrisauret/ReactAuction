import React from 'react';
import { bindActionCreators } from 'redux';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Items';


const styles = {
    card: { width: 300 },
}

const Item = props => (

 
        <div className='card' style={styles.card}>
            <img className="card-img-top" src="https://picsum.photos/220/300?blur=5" alt={props.item.title} />
            <div className="card-body">
                <h4 className="card-title">{props.item.title}</h4>
                <p className="card-text">Bidding Ends:{props.item.expiry}</p>

                <p className="card-text">Starting Bid:{props.item.startingBid}</p>

                <p className="card-text">Current Bid:{props.item.currentBid}</p>

                <div className="form-group">
                    <label htmlFor="bid">Place Bid:</label>
                    <input type="text" className="form-control" id="bid" />
                </div>

                <button className="btn btn-primary" onClick={props.item.placeBid}>Place Bid</button>

            </div>
        </div>
);

export default connect(
    state => { },
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Item);
