import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import REST_URLS from './RestUrl';
import { Typography, Paper, FormControl, RadioGroup, FormControlLabel, Button, MobileStepper, Radio, Grid } from '@material-ui/core';
import Loading from './Loading';
import { signWxConfig } from './WxUtil';

const styles = theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 2,
  },
  alignCenter: {
    textAlign: 'center',
  },
  section: {
    marginBottom: 5,
  },
  optionRoot: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit} px 0`,
  },
  noQuestion: {
    marginTop: theme.spacing.unit * 5,
    textAlign: 'center',
  },
  flag: {
    width: 100,
  }
});

class Guess extends React.Component {
  state = {
    isLoaded: false,
    activeStep: 0,
    data: {},
    answers: [],
    redirectToMenu: false,
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleChange = event => {
    const { answers, activeStep } = this.state;
    const newAnswers = [...answers];
    newAnswers[activeStep] = event.target.value;
    this.setState({
      answers: newAnswers,
    });
  };

  handleSubmit = () => {
    const { answers } = this.state;
    axios.post(REST_URLS.question, {
      answers: answers,
    })
    .then(response => {
      console.log(response);
      const data = response.data;
      if (data.errorCode === 0) {
        this.setState({ redirectToMenu: true });
      }
    })
    .catch(error => {
      console.log(error);
    });
  };

  componentDidMount() {
    signWxConfig();

    axios.get(REST_URLS.question)
      .then((response) => {
        this.setState({
          isLoaded: true,
          data: response.data,
          activeStep: 0,
          // answers: Array(response.data.errorCode === 0 ? response.data.questionList.length : 0),
          answers: response.data.lastAnswerList,
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

    const { redirectToMenu } = this.state;
    if (redirectToMenu) {
      return <Redirect to="/menu" />;
    }

    const { classes } = this.props;
    const { answers } = this.state;
    const { activeStep } = this.state;
    const { questionList } = this.state.data;
    const maxSteps = questionList ? questionList.length : 0;
    const menuLink = props => <Link to="/menu" {...props} />
    
    return (
      <div className={classes.root}>
        {maxSteps ? (
          <div>
            <div className={classes.alignCenter}>
              <Typography variant="title" className={classes.section}>
                {questionList[activeStep].sectionName}
              </Typography>
              <Paper elevation={2}>
                <Typography variant="headline">
                {questionList[activeStep].itemName}
                </Typography>
                <Typography component="p">
                {questionList[activeStep].itemContent}
                </Typography>
                <Grid container>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={3}>
                    <img src={questionList[activeStep].imageUrl} className={classes.flag} />
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={3}>
                    <img src={questionList[activeStep].imageUrl2} className={classes.flag} />
                  </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>
              </Paper>
              
            </div>
            <div className={classes.optionRoot}>
              <FormControl component="fieldset" required className={classes.formControl}>
                {/* <FormLabel component="legend">opt</FormLabel> */}
                <RadioGroup
                  // aria-label="opt"
                  name="prediction"
                  className={classes.group}
                  value={answers[activeStep]}
                  onChange={this.handleChange}
                >
                  {questionList[activeStep].options.map(option => {
                    const keyValue = [
                      questionList[activeStep].sectionId,
                      questionList[activeStep].itemId,
                      option.optionId
                    ].join("-");
                    return (
                      <FormControlLabel
                        key={ keyValue }
                        value={ keyValue }
                        control={<Radio />}
                        label={option.optionContent}
                      />
                    );
                  })};
                </RadioGroup>
              </FormControl>
            </div>
            <div className={classes.alignCenter}>
              {activeStep === maxSteps - 1 &&
                <Button variant="raised" color="primary" disabled={!answers[activeStep]} onClick={this.handleSubmit}>
                  提交
                </Button>
              }
            </div>
            <MobileStepper
              variant="progress"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              className={classes.mobileStepper}
              nextButton={
                <Button size="small" onClick={this.handleNext} disabled={(activeStep === maxSteps - 1) || !answers[activeStep]}>
                  下一个
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                  上一个
                  <KeyboardArrowLeft />
                </Button>
              }
            />
          </div>
          
        ) : (
          <div className={classes.noQuestion}>
            <Button color="secondary" component={menuLink}>
              <KeyboardArrowLeft />
              返回
            </Button>
            <Typography variant="title">暂时还没有下一轮竞猜项目</Typography>
          </div>
        )}
      </div>
    );
  }
}

Guess.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Guess);
