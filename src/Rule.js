import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
// import { Button } from '@material-ui/core';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import { signWxConfig } from './WxUtil';
import rulePic1 from './image/rule1.jpg';

const styles = theme => ({
  root: {
    // paddingTop: 3,
  },
  rule: {
    width: '100%',
  }
});

class Rule extends React.Component {
  componentDidMount() {
    signWxConfig();
  }

  render() {
    const { classes } = this.props;
    // const menuLink = props => <Link to="/menu" {...props} />

    return (
      <div className={classes.root}>
        {/* <Button color="secondary" component={menuLink}>
          <KeyboardArrowLeft />
          返回
        </Button> */}
        <div>
          <img src={rulePic1} alt="" className={classes.rule} />
        </div>
      </div>
    );
  }
}

Rule.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Rule);
