import React from 'react';
import { connect } from 'react-redux';
import API from 'utils/api';
import Page from 'components/page';
import Pagination from 'components/pagination';
import AlertDialog from 'components/AlertDialog';
import PostItem from './components/postItem';

import './index.scss';

class HomePage extends React.Component {
  state = { posts: [], page: 1, lastPage: 999 };
  deleteId = '';
  componentDidMount() {
    this.loadData(this.state.page);
  }
  loadData(page = 1) {
    if (page > this.state.lastPage) {
      console.log('没有数据了');
      return;
    }
    API.posts({ params: { page, perPage: 10 } }).then(res => {
      if (res.status === 200) {
        let { data } = res;
        this.setState((state, props) => {
          return {
            posts: data.data,
            page: data.page,
            lastPage: data.lastPage
          };
        });
      }
    });
  }
  onDelete = id => {
    let alertIns = this.refs['alertRef'];
    alertIns && alertIns.show();
    this.deleteId = id;
  };
  onDeleteSure = () => {
    API.deletePost({ data: { id: this.deleteId } }).then(res => {
      if (res.status === 200) {
        console.log('删除成功');
        this.deleteId = '';
        this.loadData(this.state.page);
      }
    });
  };
  onPageChagne = page => {
    this.loadData(page);
  };
  render() {
    let { posts, page, lastPage } = this.state;
    return (
      <Page>
        <ul className='my-posts-list'>
          {posts.map((item, k) => {
            return (
              <PostItem
                postItem={item}
                deletePost={this.onDelete}
                key={item.id}
              />
            );
          })}
        </ul>
        {posts && posts.length ? (
          <Pagination
            page={page}
            lastPage={lastPage}
            pageChange={this.onPageChagne}
          />
        ) : null}
        <AlertDialog
          ref='alertRef'
          title='Warning'
          content='Are you sure to delete this post? It can not be restored after deletion.'
          onSure={this.onDeleteSure}
          sureText='DELETE'
        />
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    logined: state.logined
  };
};

export default connect(mapStateToProps)(HomePage);
