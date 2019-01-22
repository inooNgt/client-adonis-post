import React from 'react';
import './index.scss';
import Button from '@material-ui/core/Button';

export default class Pagination extends React.Component {
  prev = () => {
    let { page } = this.props;
    this.submitPage(--page);
  };
  next = () => {
    let { page } = this.props;
    this.submitPage(++page);
  };
  submitPage(page) {
    this.props.pageChange && this.props.pageChange(page);
  }
  render() {
    let { page, lastPage } = this.props;
    return (
      <div className='pagination-box'>
        <Button
          size='small'
          variant='outlined'
          className='pagination-btn'
          disabled={page === 1}
          onClick={this.prev}
        >
          上一页
        </Button>
        <span className='pagination-num'>
          第{page}/{lastPage}页
        </span>
        <Button
          size='small'
          variant='outlined'
          className='pagination-btn'
          disabled={page === lastPage}
          onClick={this.next}
        >
          下一页
        </Button>
      </div>
    );
  }
}
