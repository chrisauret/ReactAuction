import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Items';

const styles = {
    card: {
        width: 300,
        margin: "25px"
    },
}

class Item extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bidAmount: props.item.bidAmount
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
            <div className='card' style={styles.card}>
                <img className="card-img-top" src="https://picsum.photos/220/150?blur=5" alt={this.props.item.title} />
                <div className="card-body">
                    <h4 className="card-title">{this.props.item.title}</h4>
                    <p className="card-text">Bidding Ends:{this.props.item.expiry}</p>
                    <p className="card-text">Starting Bid:{this.props.item.startingBid}</p>
                    <p className="card-text">Current Bid:{this.props.item.currentBid}</p>
                    <form onSubmit={this.onSubmit}>
                        <input id="id" type="hidden" value={this.props.item.id} />
                        <div className="form-group">
                            <label htmlFor="bid">Place Bid:</label>
                            <input type="text" className="form-control" value={this.state.bidAmount || ""} id="bid" onChange={this.onChange} />
                        </div>
                        <button type="submit" className=" btn btn-primary" >Place Bid</button>
                    </form>
                </div>
            </div>
        )
    }

    onChange(e) {
        this.setState({ bidAmount: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        var data = {
            itemId: this.props.item.id,
            bidAmount: Number(this.state.bidAmount)
        }

        this.props.placeBid(data);
    }
}

function mapStateToProps(state, ownProps) {
    //It is called every time the store state changes.
    //It receives the entire store state, and should return an object of data this component needs.

    var stateToProps =  {
        ...ownProps,
        bidAmount: state.items.bidAmount
    }

    return stateToProps;
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Item);
