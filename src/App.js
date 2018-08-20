import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import logo from './logo.svg';
import './App.css';
import withRoot from './withRoot';
import MenuAppBar from './MenuAppBar';
import { Typography, CircularProgress } from '@material-ui/core';
import REST_URLS from './RestUrl';
import userAuth from './UserAuth';
import SubscribeTip from './SubscribeTip';
import Invitation from './Invitation';
import MainMenu from './MainMenu';
import Department from './Department';
import Guess from './Guess';
import Rank from './Rank';
import Rule from './Rule';
import Result from './Result';
import Loading from './Loading';
import { signWxConfig } from './WxUtil';
import activityUrlQrPic from './image/activityUrlQr.png';
import bkPic from './image/worldCupBk.png';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      userAuth.isNeedInvitation ? (
        <Redirect
          to={{
            pathname: "/invitation",
            state: { from: props.location }
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const styles = theme => ({
  root: {
    // paddingTop: theme.spacing.unit * 2,
  },
  msgRoot: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit,
  },
  loadingRoot: {
    // backgroundImage: `url(${bkPic})`,
    // height: '500px',
    // width: '100%',
    // backgroundSize: 'cover',
  },
  bkPic: {
    width: '100%',
    position: 'absolute',
  },
  qr: {
    width: '80%',
  },
  waitRoot: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 5,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class App extends React.Component {
  state = {
    isLoaded: false,
    data: {},
  };

  componentDidMount() {
    signWxConfig();
    // const { history } = this.props;
    // this.setState({
    //       isLoaded: true,
    //     });
    // history.push("/invitation");
    /*axios.get(REST_URLS.user)
      .then(response => {
        // userAuth.isShowMenu = true;
        const { data } = response;
        this.setState({
          isLoaded: true,
          data: data,
        });
        const { history } = this.props;
        if (data.errorCode === 0 && data.subscribe === 1 && !data.activityOver) {
          userAuth.isNeedInvitation = data.needInvitation;
          userAuth.isNeedDept = data.needDept;
          history.push("/menu");
          if (data.needInvitation) {
            history.push("/invitation");
          } else if (data.needDept) {
            history.push("/dept");
          } else {
            history.push("/menu");
          }
        }
      })
      .catch(error => {
        console.log(error);
      });*/
  }

  render() {
    const { classes } = this.props;
    const { isLoaded, data } = this.state;
    return (
      <Invitation />
    );

    // if (!isLoaded) {
    //   return (
    //     <div className={classes.loadingRoot}>
    //       <img src={bkPic} alt="" className={classes.bkPic} />
    //       {/* <Loading /> */}
    //       {/* <div className={classes.waitRoot}>
    //         <CircularProgress className={classes.progress}  color="secondary" />
    //         <Typography color="secondary">加载中...</Typography>
    //       </div> */}
    //     </div>
    //   );
    // } else if(data.errorCode !== 0) {
    //   if (data.errorCode === 1) {
    //     return (
    //       <div>
    //         <MenuAppBar />
    //         <div className={classes.msgRoot}>
    //           <Typography variant="subheading" align="center">请使用二维码中的链接参加竞猜</Typography>
    //           <img src={activityUrlQrPic} alt="" className={classes.qr}/>
    //         </div>
    //       </div>
    //     );
    //   } else if (data.errorCode === 2) {
    //     return (
    //       <div>
    //         <MenuAppBar />
    //         <div className={classes.msgRoot}>
    //           <Typography variant="subheading" align="center">获取微信信息失败，请尝试重新访问</Typography>
    //         </div>
    //       </div>
    //     );
    //   } else {
    //     return (
    //       <div>
    //         <MenuAppBar />
    //         <div className={classes.msgRoot}>
    //           <Typography variant="subheading" align="center">{data.errorMessage}</Typography>
    //         </div>
    //       </div>
    //     );
    //   }
    // } else if(data.subscribe !== 1) {
    //   return (
    //     <div>
    //       <MenuAppBar />
    //       <div className={classes.waitRoot}>
    //         <SubscribeTip />
    //       </div>
    //     </div>
    //   );
    // } else if(data.activityOver) {
    //   return (
    //     <div>
    //       <MenuAppBar />
    //       <div className={classes.waitRoot}>
    //         <Typography variant="title">竞猜已结束</Typography>
    //       </div>
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div>
    //       <MenuAppBar headImgUrl={data.headImgUrl} />
    //       <div className={classes.root}>
    //         <Switch>
    //            <Route path="/invitation" componet={Invitation} />
    //           {/*<Route path="/invitation" render={(props) => (
    //             <Invitation {...props} />
    //           )} />
    //         */}
    //           <AuthRoute path="/menu" component={MainMenu}  />
    //           <AuthRoute path="/dept" component={Department} />
    //           <AuthRoute path="/rule" component={Rule} />
    //           <AuthRoute path="/guess" component={Guess} />
    //           <AuthRoute path="/result" component={Result} />
    //           <AuthRoute path="/rank" component={Rank} />
    //         </Switch>
    //       </div>
    //     </div>
    //   );
    // }
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withRoot(withStyles(styles)(App)));
