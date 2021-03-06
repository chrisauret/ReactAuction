import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/styles';
import * as actionCreators from '../store/actions/itemActions'
import DisplayExpiry from './DisplayExpiry';

const styles = theme => {
    return {
        card: {
            width: 250,
        },
        amount: {
            width: "100px"
        },
        fillSpace: {
            //flex: 1
            "margin-left": "auto",

        },
        alignBottom: {
            "align-items": "flex-end"
        }
    };
};

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

        const { classes } = this.props;
        const id = this.props.item.id;

        return (
            <Grid item>
                <Card className={classes.card}>
                    <CardContent>
                        {
                            //<Skeleton variant="rect" width={210} height={118} />
                        }
                        <img className="card-img-top" src="placeholder.png" alt={this.props.item.title} />
                        <Typography component="h3" variant="h5" color="textPrimary" gutterBottom>
                            {this.props.item.title}
                        </Typography>

                        <Box display="flex" flexDirection="row">
                            <Box>
                                <Typography component="h6" gutterBottom>
                                    <DisplayExpiry expiry={this.props.item.expiry}></DisplayExpiry>
                                </Typography>
                            </Box>
                            <Box className={classes.samsonFlex}>
                                <Typography component="h6" gutterBottom>
                                    <span>[{this.props.item.bids.length} bids ]</span>
                                </Typography>
                            </Box>

                        </Box>

                        <Typography component="h6">
                            Starting bid: ${this.props.item.startingBid}
                        </Typography>
                        <Typography component="h6" variant="subtitle1" gutterBottom>
                            Current bid: ${this.props.item.currentBid}
                        </Typography>
                        <form onSubmit={this.handleSubmit} noValidate>
                            <Box display="flex" flexDirection="row" className={classes.alignBottom}>
                                <Box>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor={"adornment-amount-" + id}>Bid Amount</InputLabel>
                                        <Input
                                            id={"adornment-amount-" + id}
                                            value={this.state.bid || ""}
                                            onChange={this.handleChange}
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            className={classes.amount}
                                        />
                                    </FormControl>
                                </Box>

                                <Box className={classes.fillSpace}>
                                    <Button type="submit" variant="contained" color="primary">
                                        Place Bid
                                    </Button>
                                </Box>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

export default compose(
    withStyles(styles, {
        name: 'Item',
    }),
    connect(null, mapDispatchToProps),
)(Item);