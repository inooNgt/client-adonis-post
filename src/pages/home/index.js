import React from 'react';
import { connect } from 'react-redux';
import API from 'utils/api';
import Page from 'components/page';

import './index.scss';

class HomePage extends React.Component {
  state = { posts: [] };
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    API.posts().then(res => {
      if (res.status === 200) {
        let { data } = res;
        this.setState({
          posts: data.posts
        });
      }
    });
  }
  render() {
    let { posts } = this.state;
    return <Page>home</Page>;
  }
}

const mapStateToProps = state => {
  return {
    logined: state.logined
  };
};

export default connect(mapStateToProps)(HomePage);
