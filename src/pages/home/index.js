import React from 'react';
import { connect } from 'react-redux';
import API from 'utils/api';
import Page from 'components/page';
import Pagination from 'components/pagination';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './index.scss';

class HomePage extends React.Component {
  state = { posts: [], page: 1, lastPage: 999 };
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
  onPageChagne = page => {
    this.loadData(page);
  };
  render() {
    let { posts, page, lastPage } = this.state;
    return (
      <Page>
        <ul className='posts-list'>
          {posts.map((item, k) => {
            return (
              <li className='posts-item' key={item.id}>
                <h4 className='posts-item-title'>
                  <Link
                    to={{ pathname: `/postdetail`, search: `?id=${item.id}` }}
                  >
                    {item.post_title}
                  </Link>
                </h4>
                <div className='posts-item-info'>
                  <span>{item.author}</span>
                  <span> {item.created_at}</span>
                </div>
              </li>
            );
          })}
        </ul>
        <Pagination
          page={page}
          lastPage={lastPage}
          pageChange={this.onPageChagne}
        />
        <div />
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
