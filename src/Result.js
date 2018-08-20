import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import REST_URLS from './RestUrl';
import { Typography, ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanel, Button } from '@material-ui/core';
import Loading from './Loading';
import { signWxConfig } from './WxUtil';

const styles = theme => ({
  answer: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  // heading: {
  //   fontSize: theme.typography.pxToRem(15),
  //   fontWeight: theme.typography.fontWeightRegular,
  // },
  middleContent: {
    marginLeft: 20,
    marginRight: 20,
  },
  correct: {
    color: green[500],
  }


  // card: {
  //   minWidth: 275,
  // },
  // bullet: {
  //   display: 'inline-block',
  //   margin: '0 2px',
  //   transform: 'scale(0.8)',
  // },
  // title: {
  //   marginBottom: 16,
  //   fontSize: 14,
  // },
  // pos: {
  //   marginBottom: 12,
  // },
});

class Result extends React.Component {
  state = {
    isLoaded: false,
    data: {},
  };

  componentDidMount() {
    signWxConfig();

    axios.get(REST_URLS.answer)
    .then((response) => {
      this.setState({
        isLoaded: true,
        data: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    const { isLoaded } = this.state;
    if (!isLoaded) {
      return(
        <Loading />
      );
    }

    const { classes } = this.props;
    const { errorCode } = this.state.data;
    const answerSections = errorCode === 0 ? this.state.data.answerSections : [];
    const menuLink = props => <Link to="/menu" {...props} />

    return (
      <div>
        <Button color="secondary" component={menuLink}>
          <KeyboardArrowLeft />
          返回
        </Button>
        <div className={classes.answer}>
          {answerSections.map((answerSection, index) => (
          <ExpansionPanel defaultExpanded={index === 0}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="title" component="h2">{answerSection.sectionName}</Typography>
            </ExpansionPanelSummary>
            {answerSection.answerItems.map((answerItem, index) => (
              <ExpansionPanelDetails key={index} className={answerItem.correct === "1" ? classes.correct : null}>
                <Typography color="inherit">{answerItem.itemName}</Typography>
                <Typography className={classes.middleContent} color="inherit">{answerItem.itemContent}</Typography>
                <Typography color="inherit">{answerItem.optionContent}</Typography>
              </ExpansionPanelDetails>
            ))}
          </ExpansionPanel>
          ))}
        </div>
      </div>
    );
  }
}

Result.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Result);
