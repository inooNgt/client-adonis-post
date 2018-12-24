import React from 'react';
import { get } from 'utils/http';
import API from 'utils/api';
import config from 'utils/config';
import Page from 'components/page';

import './index.scss';

export default class HomePage extends React.Component {
  state = { posts: [] };
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    get(API.posts).then(res => {
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
    return (
      <Page>
        {posts.map((item, k) => {
          return (
            <h3 key={item.id}>
              {k + 1}、{item.post_title}
            </h3>
          );
        })}
      </Page>
    );
  }
}
