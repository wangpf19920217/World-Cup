import React from 'react';
import { Redirect, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Button, Typography, TextField } from '@material-ui/core';
import REST_URLS from './RestUrl';
import userAuth from './UserAuth';
import { signWxConfig } from './WxUtil';
import inviteCodePic from './image/Invitationcode.png';
import inviteCodePic1 from './image/worldCupBk.png';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 2,
  },
  inviteCode: {
    marginLeft: theme.spacing.unit,
    marginRigth: theme.spacing.unit,
    maxWidth: 80,
    // fontSize: theme.typography.pxToRem(24),
    // fontWeight: theme.typography.fontWeightRegular,
  },
  form: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    marginTop: theme.spacing.unit * 2,
  }
});

let inputbox={
      width:'64%',
      margin:'0 auto',
      height:'44px',
      background:'white',
      color:'00f9fb',
      fontSize:'10px',
      border:'2px solid #00f9fb',
      borderRadius:'44px',
      boxShadow: '0px 1px 23px #f1e9e9',
  };
  let divpositon={
     position: 'absolute',
     top: '64%',
  }
  let iput={
    border:'none',
    outline: 'none',
    width: '100%',
    height: '100%',
    lineHeight:'44px',
    textAlign:'center',
    background:'none',
   }
   let imgstyle={
    width: "86%",
    marginTop:'24px',
   }


class Invitation extends React.Component {
  state = {
    inviteCode: "",
    maxlength:6,
    hasError: false,
    errorMsg: "",
    redirectToReferrer: false,
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  handleSubmit = () => {
    const { inviteCode } = this.state;
    axios.post(REST_URLS.valid, {
      inviteCode: inviteCode,
    })
    .then(response => {
      const data = response.data;
      if (data.errorCode === 0) { 
        userAuth.isNeedInvitation = false;
        this.setState({ 
          hasError: false,
          errorMsg: "",
          redirectToReferrer: true,
        });
        // this.setState({ redirectToMenu: true });
      } else if (data.errorCode === 10) {
        this.setState({ 
          hasError: true,
          errorMsg: data.errorMessage,
        });
      } else {
        console.log(response);
      }
    })
    .catch(error => {
      console.log(error);
    });
  };


  handleChangeInput = (e) =>{
    //做输入处理
        let val = e.target.value;
        this.setState({ 
          inviteCode:e.target.value,
        });
        // console.log(val.length,val)
      if(val.length > 6){
          this.setState({ 
            errorMsg: "超出限制",
          });   
      }else if(val.length < 6 ){
        this.setState({ 
          errorMsg: "长度不够",
        });
      }else{
        this.setState({ 
          errorMsg: "可以提交",
        });
      }

    // console.log(this.state.inviteCode,this.state.errorMsg);
  }  

  componentDidMount() {
    signWxConfig();
  }

  render() {
    const { classes } = this.props;

    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      // return <Redirect to={from} />;
      return <Redirect to="/dept" />;
    }
    
    return (
      <div style={divpositon}>
        <div className={classes.root}>
          <div  style={inputbox} >
            <input  style={iput} maxlength={this.state.maxlength} value={this.state.inviteCode} onChange = {this.handleChangeInput} />
            <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmit}>
              提交
            </Button>
            <img  style={imgstyle} src={inviteCodePic} alt=""/>
            <p>{this.state.errorMsg}</p>
          </div>         
          
        </div>
    </div>
    );
  }
}

Invitation.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Invitation));
