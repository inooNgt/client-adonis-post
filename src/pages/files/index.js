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
  <li className='files-item'>
    <h4 className='files-item-title'>
      <a href={item.url}>{item.filename}</a>
    </h4>
    <div className='files-item-info'>
      {/* <span>{item.filename}</span> */}
      <span> {item.created_at}</span>
    </div>
  </li>
);

class FilePage extends React.Component {
  state = { files: [], page: 1, lastPage: 999, showError: false };
  componentDidMount() {
    this.loadData(this.state.page);
  }
  loadData(page = 1) {
    if (page > this.state.lastPage) {
      console.log('没有数据了');
      return;
    }
    API.files({ params: { page, perPage: 10 } })
      .then(res => {
        if (res.status === 200) {
          let { data } = res;
          this.setState((state, props) => {
            return {
              showError: false,
              files: data.data,
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
    let { files, page, lastPage, showError } = this.state;
    return (
      <Page>
        {showError ? (
          <img className='uni-empty-img' src={emptyImg} />
        ) : files.length ? (
          <ul className='files-list'>
            {files.map((item, k) => {
              return <PostItem item={item} key={item.id} />;
            })}
          </ul>
        ) : (
          <LoadingSvg />
        )}
        {files && files.length ? (
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

export default connect(mapStateToProps)(FilePage);
