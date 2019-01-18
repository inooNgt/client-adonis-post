import React from 'react';
import { connect } from 'react-redux';

import API from 'utils/api';
import { setLoginStatus, setUser } from 'store/actions';

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

class PageContainer extends React.Component {
  componentDidMount() {
    this.checkLogin();
  }
  checkLogin() {
    /**
     *  get userinfo
     */
    API.user()
      .then(res => {
        if (res.status === 200 && res.data) {
          this.props.setLoginStatus(true);

          this.props.setUser(res.data);
        } else {
          this.props.setLoginStatus(false);
        }
      })
      .catch(e => {
        this.props.setLoginStatus(false);
        console.log(e);
      });
  }
  render() {
    return <div className='page-container'>{this.props.children}</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContainer);
