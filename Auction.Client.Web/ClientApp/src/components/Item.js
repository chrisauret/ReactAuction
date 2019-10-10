import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Items';
import DisplayExpiry from './DisplayExpiry';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

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

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <Card styles={styles.card}>
                <CardContent>
                    <div className="">
                        <Typography component="h4" variant="h3" color="textPrimary">
                            {this.props.item.title}
                        </Typography>
                    </div>
                    <Typography component="h6" variant="subtitle1" align="center">
                        <DisplayExpiry expiry={this.props.item.expiry}></DisplayExpiry>
                        <span>[{this.props.item.bids.length} bids ]</span>
                    </Typography>
                    <Typography component="h6" variant="subtitle1" align="center">
                        Starting bid: {this.props.item.startingBid}
                    </Typography>
                    <Typography component="h6" variant="subtitle1" align="center">
                        Current bid: {this.props.item.currentBid}
                    </Typography>
                </CardContent>
                <CardActions>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="adornment-amount">Amount</InputLabel>
                            <Input
                                id="adornment-amount"
                                value={this.state.bid || ""}
                                onChange={this.handleChange}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                        </FormControl>
                        <Button fullWidth variant="contained" color="primary">
                            Place Bid
                    </Button>
                    </form>
                </CardActions>
            </Card>
        )
    }

    handleChange(e) {
        var item = { ...this.state.item }
        item.bid = Number(e.target.value);

        this.setState({
            item: item,
            bid: e.target.value
        });
    }

    handleSubmit(e) {
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


            //<div className='card' style={styles.card}>
            //    <img className="card-img-top" src="https://picsum.photos/220/150?blur=5" alt={this.props.item.title} />
            //    <div className="card-body">
            //        <h4 className="card-title">{this.props.item.title}</h4>
            //        <p className="card-text">
            //            <DisplayExpiry expiry={this.props.item.expiry}></DisplayExpiry> 
            //            <span>[{this.props.item.bids.length} bids ]</span>

            //        </p>
            //        <p className="card-text">Starting Bid:{this.props.item.startingBid}</p>
            //        <p className="card-text">Current Bid:{this.props.item.currentBid}</p>
            //        <form onSubmit={this.onSubmit}>
            //            <input id="id" type="hidden" value={this.props.item.id} />
            //            <div className="form-group">
            //                <input type="text" className="form-control" value={this.state.bid || ""} id="bid" onChange={this.onChange} />
            //                <button type="submit" className="btn btn-primary" style={styles.bid}>Place Bid</button>
            //            </div>

            //        </form>
            //    </div>
            //</div>