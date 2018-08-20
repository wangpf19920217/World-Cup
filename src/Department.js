import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button, TextField } from '@material-ui/core';
import REST_URLS from './RestUrl';
import userAuth from './UserAuth';
import { signWxConfig } from './WxUtil';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
  },
  realName: {
    margin: theme.spacing.unit,
    width: '100%',
  },
  buttonGrid: {
    textAlign: 'center',
  },
  button: {
    marginTop: 50,
  },
});


class Department extends React.Component {
  state = {
    data: {},
    realName: "",
    dept2Index: -1,
    dept3Index: -1,
    redirectToMenu: false,
    departments: [],
  };

  componentDidMount() {
    signWxConfig();

    axios.get(REST_URLS.dept)
    .then((response) => {
      const data = response.data;
      if (data.errorCode === 0) {
        this.setState({
          data: response.data,
          realName: data.realName,
          dept2Index: data.selectedDept2Index,
          dept3Index: data.selectedDept3Index,
          departments: data.departments,
        });
      } else {
        console.log(response);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleTextChange = name => event => {
    if (name === "realName" && event.target.value.length > 16) {
      return;
    }
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChange2 = event => {
    this.setState({
      dept2Index: event.target.value,
      dept3Index: -1,
    });
  };

  handleChange3 = event => {
    this.setState({
      dept3Index: event.target.value,
    });
  };

  handleSubmit = () => {
    const { realName, dept2Index, dept3Index, departments } = this.state;
    const dept2Id = departments[dept2Index].id;
    const dept3 = departments[dept2Index].children;
    const dept3Id = dept3Index === -1 ? null : dept3[dept3Index].id;
    axios.post(REST_URLS.savedept, {
      realName: realName,
      dept2Id: dept2Id,
      dept3Id: dept3Id,
    })
    .then(response => {
      const data = response.data;
      if (data.errorCode === 0) {
        userAuth.isNeedDept = false;
        this.setState({ redirectToMenu: true });
      } else {
        console.log(response);
      }
    })
    .catch(error => {
      console.log(error);
    });
  };

  render() {
    const { redirectToMenu } = this.state;
    if (redirectToMenu) {
      return <Redirect to="/menu" />;
    }

    const { classes } = this.props;
    const { departments } = this.state;
    const { realName, dept2Index, dept3Index } = this.state;

    return (
      <div className={classes.root}>
        <form className={classes.form}>
          <Typography variant="title" className={classes.title}>
            请输入姓名
          </Typography>
          <TextField
            required
            id="realName"
            label="姓名"
            className={classes.realName}
            value={realName}
            onChange={this.handleTextChange('realName')}
            margin="normal"
            // error={this.state.hasError}
            // helperText={this.state.errorMsg}
          />
          <Typography variant="title" className={classes.title}>
            请选择部门
          </Typography>
          <FormControl className={classes.formControl} required>
            <InputLabel htmlFor="dept2Index">二级部门</InputLabel>
            <Select
              value={dept2Index}
              onChange={this.handleChange2}
              inputProps={{
                name: 'dept2Index',
                id: 'dept2Index',
              }}
            >
              <MenuItem value={-1}><em>请选择</em></MenuItem>
              {departments.map((dept, index) => (  
                <MenuItem key={index} value={index}>{dept.name}</MenuItem>                    
              ))};
            </Select>
            <FormHelperText>请选择二级部门</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl} required>
            <InputLabel htmlFor="dept3Index">三级部门</InputLabel>
            <Select
              value={dept3Index}
              onChange={this.handleChange3}
              inputProps={{
                name: 'dept3Index',
                id: 'dept3Index',
              }}
            >
              <MenuItem value={-1}><em>请选择</em></MenuItem>
              {departments[dept2Index] && departments[dept2Index].children.map((dept, index) => (  
                <MenuItem key={index} value={index}>{dept.name}</MenuItem>                    
              ))};
            </Select>
            <FormHelperText>请选择三级部门</FormHelperText>
          </FormControl>
          <div className={classes.buttonGrid}>
            <Button variant="raised" color="primary" className={classes.button}
              disabled={
                dept2Index === -1 
                || (departments[dept2Index].children.length > 0 && dept3Index === -1)
                || realName.length === 0
              }
              onClick={this.handleSubmit}
            >
              确定
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

Department.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Department);
