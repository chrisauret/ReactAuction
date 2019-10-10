import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Items';
import DisplayExpiry from './DisplayExpiry';

const styles = {
    card: {
        width: 300,
        margin: "25px"
    },
    bids: {
         display: "inline - block"
    }
}

class Item extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...props,
            bid: this.props.bid
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
                    <p className="card-text">
                        <DisplayExpiry expiry={this.props.item.expiry}></DisplayExpiry> 
                        <span>[{this.props.item.bids.length} bids ]</span>

                    </p>
                    <p className="card-text">Starting Bid:{this.props.item.startingBid}</p>
                    <p className="card-text">Current Bid:{this.props.item.currentBid}</p>
                    <form onSubmit={this.onSubmit}>
                        <input id="id" type="hidden" value={this.props.item.id} />
                        <div className="form-group">
                            <input type="text" className="form-control" value={this.state.bid || ""} id="bid" onChange={this.onChange} />
                            <button type="submit" className="btn btn-primary" style={styles.bid}>Place Bid</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }

    onChange(e) {
        var item = { ...this.state.item }
        item.bid = Number(e.target.value);

        this.setState({
            item: item,
            bid: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.placeBid(this.state.item);
        this.setState({ bid: null });
    }
}

function mapStateToProps(state, ownProps) {
    return ownProps;
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Item);
