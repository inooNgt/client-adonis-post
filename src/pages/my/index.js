import React from 'react';
import { connect } from 'react-redux';
import { get } from 'utils/http';
import API from 'utils/api';
import Page from 'components/page';

import './index.scss';

class MyPage extends React.Component {
  state = { user: [] };
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    API.user().then(res => {
      if (res.status === 200) {
        let { data } = res;
        this.setState({
          user: data.user
        });
      }
    });
  }
  render() {
    let { user } = this.state;
    return <Page>my</Page>;
  }
}

const mapStateToProps = state => {
  return {
    logined: state.logined
  };
};

export default connect(mapStateToProps)(MyPage);
