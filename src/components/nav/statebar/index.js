import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { setLoginStatus, setUser } from 'store/actions';
import API from 'utils/api';
import './index.scss';

class StateBar extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ anchorEl: null });
  };
  logout = () => {
    this.closeMenu();
    API.logout().then(res => {
      if (res.status === 200) {
        console.log('登出成功!');
        this.props.setLoginStatus(false);
        this.props.setUser(null);
        this.props.history.replace('/');
      }
    });
  };

  render() {
    const { anchorEl } = this.state;
    const { user, logined } = this.props;
    return (
      <div className='nav-statebar'>
        <Tooltip title='Writing'>
          <Link to='/create' className='nav-statebar-add'>
            +
          </Link>
        </Tooltip>
        {user && user.avatar ? (
          <img
            className='nav-statebar-avatar'
            onClick={this.handleClick}
            src={user && user.avatar}
          />
        ) : null}
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.closeMenu}
        >
          <MenuItem onClick={this.closeMenu}>
            <Link to='/my'>My account</Link>
          </MenuItem>
          <MenuItem onClick={this.logout}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    logined: state.loginStatus.logined
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setLoginStatus: (...args) => dispatch(setLoginStatus(...args)),
    setUser: (...args) => dispatch(setUser(...args))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StateBar);
