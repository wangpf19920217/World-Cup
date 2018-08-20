import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import REST_URLS from './RestUrl';
import { signWxConfig } from './WxUtil';

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 2,
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: 15,
    marginBottom: 15,
  },
});

class MainMenu extends React.Component {

  componentDidMount() {
    signWxConfig();
  }

  render() {
    const { classes } = this.props;
    const ruleLink = props => <Link to="/rule" {...props} />
    const guessLink = props => <Link to="/guess" {...props} />
    const resultLink = props => <Link to="/result" {...props} />
    const rankLink = props => <Link to="/rank" {...props} />

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Button variant="raised" color="secondary" className={classes.button} component={ruleLink}>
              竞猜规则
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="raised" color="primary" className={classes.button} component={guessLink}>
              本轮竞猜
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="raised" color="secondary" className={classes.button} component={resultLink}>
              查看结果
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="raised" color="secondary" className={classes.button} component={rankLink}>
              部门排行
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

MainMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainMenu);
