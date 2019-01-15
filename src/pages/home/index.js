import React from 'react';
import { connect } from 'react-redux';
import API from 'utils/api';
import Page from 'components/page';
import { Link } from 'react-router-dom';
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
