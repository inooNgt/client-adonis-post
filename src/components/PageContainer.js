import React from 'react';
import { connect } from 'react-redux';

import API from 'utils/api';
import actions from 'store/actions';

const mapStateToProps = state => {
  return {
    logined: state.logined
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setLoginStatus: (...args) => dispatch(actions.setLoginStatus(...args))
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
        if (res.status === 200) {
          this.props.setLoginStatus(true);
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
