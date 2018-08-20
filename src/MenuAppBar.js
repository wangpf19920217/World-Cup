import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Menu, MenuItem, Divider } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import userAuth from './UserAuth';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
};

class MenuAppBar extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  render() {
    const { classes } = this.props;
    const { headImgUrl } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const menuLink = props => <Link to="/menu" {...props} />
    const deptLink = props => <Link to="/dept" {...props} />

    console.log('userAuth.isShowMenu:' + userAuth.isShowMenu);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            { !userAuth.isNeedInvitation && !userAuth.isNeedDept && 
              <IconButton color="inherit" component={menuLink}>
                <MenuIcon />
              </IconButton>
            }
            <Typography variant="title" color="inherit" className={classes.flex}>
              2018世界杯竞猜
            </Typography>
            { !userAuth.isNeedInvitation && !userAuth.isNeedDept ? (
              <div>
                <IconButton
                  aria-owns={ open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <Avatar src={headImgUrl} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose} component={menuLink}>竞猜菜单</MenuItem>
                  <Divider />
                  <MenuItem onClick={this.handleClose} component={deptLink}>我的部门</MenuItem>
                </Menu>
              </div>
            ) : (
              <Avatar src={headImgUrl} />
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}
  
export default withStyles(styles)(MenuAppBar);
