import React from 'react';
import { connect } from 'react-redux';
import API from 'utils/api';
import Page from 'components/page';

import './index.scss';

function Child({ match }) {
  return (
    <div>
      <h3>ID: {match.params.id}</h3>
    </div>
  );
}

class HomePage extends React.Component {
  state = { posts: [] };
  componentDidMount() {
    console.log(this.props);
    this.loadData();
  }
  loadData() {}
  render() {
    let { posts } = this.state;
    return <Page>post detail</Page>;
  }
}

const mapStateToProps = state => {
  return {
    logined: state.logined
  };
};

export default connect(mapStateToProps)(HomePage);
