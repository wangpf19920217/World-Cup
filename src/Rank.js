import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Avatar, Button } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import REST_URLS from './RestUrl';
import Loading from './Loading';
import { signWxConfig } from './WxUtil';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
    overflowX: 'auto',
  },
  title: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  table: {
    // minWidth: 700,
  },
  rankHead: {
    width: '20%',
    
  },
  avatarHead: {
    width: '20%',
  },
  nameHead: {
    width: '40%',
  },
  scoreHead: {
    width: '20%',
  },
  rank: {
    textAlign: 'center',
  }
  
});



class Rank extends React.Component {
  state = {
    isLoaded: false,
    ranks: {},
  };

  componentDidMount() {
    signWxConfig();

    axios.get(REST_URLS.rank)
    .then((response) => {
      const data = response.data;
      if (data.errorCode === 0) {
        this.setState({
          isLoaded: true,
          ranks: response.data.ranks,
        });
      } else {
        console.log(response);
      }
      
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
    const { ranks } = this.state;
    const menuLink = props => <Link to="/menu" {...props} />
    console.log(ranks);
    return (
      <div>
        <Button color="secondary" component={menuLink}>
          <KeyboardArrowLeft />
          返回
        </Button>
        <Paper className={classes.root}>
          <Typography variant="title" align="center" className={classes.title}>部门排行榜</Typography>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.rankHead} padding="dense">排名</TableCell>
                <TableCell className={classes.avatarHead} padding="dense">头像</TableCell>
                <TableCell className={classes.nameHead} padding="dense">姓名</TableCell>
                <TableCell numeric className={classes.scoreHead} padding="dense">分数</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ranks.map((rank, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className={classes.rank} padding="dense">{rank.rank}</TableCell>
                    <TableCell padding="dense"><Avatar src={rank.headImgUrl}/></TableCell>
                    <TableCell padding="dense">{rank.realName}</TableCell>
                    <TableCell numeric padding="dense">{rank.score}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

Rank.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Rank);
