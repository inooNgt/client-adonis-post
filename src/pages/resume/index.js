import React from 'react';
import { connect } from 'react-redux';
import API from 'utils/api';
import Page from 'components/page';
import { setUser } from 'store/actions';

import './index.scss';

class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  componentDidMount() {
    this.loadData();
  }
  loadData() {
    API.findUser({ params: { username: 'inooNgt' } }).then(res => {
      if (res.status === 200) {
        let { data } = res;
        this.setState({ user: data });
      }
    });
  }
  render() {
    let { user } = this.state;
    return (
      <Page>
        <div className='my-avatar'>
          {user && user.avatar ? (
            <img className='my-avatar-img' src={user && user.avatar} />
          ) : null}
        </div>
        <h4 className='my-name'>{user && user.username}</h4>
        <div className='my-email'>{user && user.email}</div>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    logined: state.loginStatus.logined,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setUser: (...args) => dispatch(setUser(...args))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPage);
