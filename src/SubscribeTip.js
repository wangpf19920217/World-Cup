import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import qrPic from './image/subscribeQr.jpg';
import { Grid } from '@material-ui/core';
import { signWxConfig } from './WxUtil';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

class SubscribeTip extends React.Component {

  componentDidMount() {
    signWxConfig();
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        {/* <Grid container>
          <Grid item xs={12}> */}
            <Typography variant="title" align="center" className={classes.title}>
              请先关注公众号，再参与竞猜
            </Typography>
          {/* </Grid>
          <Grid item xs={12}> */}
            <img src={qrPic} alt="" />
          {/* </Grid>
        </Grid> */}
      </div>
    );
  }
}

SubscribeTip.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubscribeTip);
