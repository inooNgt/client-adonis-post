import React from 'react';
import API from 'utils/api';
import Page from 'components/page';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './index.scss';

class PostItem extends React.Component {
  handleDeleteClick = () => {
    let { deletePost } = this.props;
    deletePost && deletePost(this.props.postItem.id);
  };
  render() {
    let { postItem } = this.props;
    return (
      <li className='posts-item' key={postItem.id}>
        <div className='posts-msg'>
          {' '}
          <h4 className='posts-item-title'>
            <Link
              to={{ pathname: `/postdetail`, search: `?id=${postItem.id}` }}
            >
              {postItem.post_title}
            </Link>
          </h4>
          <div className='posts-item-info'>
            <span> {postItem.created_at}</span>
          </div>
        </div>
        <div className='post-ctrl'>
          <Button color='primary'>
            <Link
              className='post-ctrl-btn'
              to={{
                pathname: `/create`,
                search: `?type=edit&&id=${postItem.id}`
              }}
            >
              EDIT
            </Link>
          </Button>
          <Button color='secondary' onClick={this.handleDeleteClick}>
            DELETE
          </Button>
        </div>
      </li>
    );
  }
}

export default PostItem;
