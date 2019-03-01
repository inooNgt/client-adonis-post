import React from 'react';
import { connect } from 'react-redux';
import API from 'utils/api';
import Page from 'components/page';
import Pagination from 'components/pagination';
import { Link } from 'react-router-dom';

import './index.scss';
import emptyImg from 'static/image/empty.svg';
import loadingImg from 'static/image/loading.svg';

const LoadingSvg = () => <img className='uni-loading' src={loadingImg} />;

const PostItem = ({ item }) => (
  <li className='posts-item'>
    <h4 className='posts-item-title'>
      <Link to={{ pathname: `/postdetail`, search: `?id=${item.id}` }}>
        {item.post_title}
      </Link>
    </h4>
    <div className='posts-item-info'>
      <span>{item.author}</span>
      <span> {item.created_at}</span>
    </div>
  </li>
);

class HomePage extends React.Component {
  state = { posts: [], page: 1, lastPage: 999, showError: false };
  componentDidMount() {
    this.loadData(this.state.page);
  }
  loadData(page = 1) {
    if (page > this.state.lastPage) {
      console.log('没有数据了');
      return;
    }
    API.posts({ params: { page, perPage: 10 } })
      .then(res => {
        if (res.status === 200) {
          let { data } = res;
          this.setState((state, props) => {
            return {
              showError: false,
              posts: data.data,
              page: data.page,
              lastPage: data.lastPage
            };
          });
        } else {
          this.loadDataError();
        }
      })
      .catch(e => {
        console.log(e);
        this.loadDataError();
      });
  }
  loadDataError = () => {
    this.setState({
      showError: true
    });
  };
  onPageChagne = page => {
    this.loadData(page);
  };
  render() {
    let { posts, page, lastPage, showError } = this.state;
    return (
      <Page>
        {showError ? (
          <img className='uni-empty-img' src={emptyImg} />
        ) : posts.length ? (
          <ul className='posts-list'>
            {posts.map((item, k) => {
              return <PostItem item={item} key={item.id} />;
            })}
          </ul>
        ) : (
          <LoadingSvg />
        )}
        {posts && posts.length ? (
          <Pagination
            page={page}
            lastPage={lastPage}
            pageChange={this.onPageChagne}
          />
        ) : null}
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
