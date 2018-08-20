import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography } from '@material-ui/core';

const styles = theme => ({
  waitRoot: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 5,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class Loading extends React.Component {
  render() {
    const { classes } = this.props;
    
    return (
      <div>
        <div className={classes.waitRoot}>
          <CircularProgress className={classes.progress} />
          <Typography>加载中...</Typography>
        </div>
      </div>
    );
  }
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading);
