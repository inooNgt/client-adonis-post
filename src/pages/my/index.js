import React from 'react';
import { connect } from 'react-redux';
import API from 'utils/api';
import Page from 'components/page';
import { setUser } from 'store/actions';

import './index.scss';

class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: [], file: null };
    this.fileChange = this.fileChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    if (!this.props.logined) {
      this.props.history.replace('/login');
      return;
    }

    this.loadData();
  }

  componentWillReceiveProps(newProps) {
    let { logined } = newProps;
    if (!logined) {
      this.props.history.replace('/login');
      return;
    }
  }

  componentDidUpdate() {}

  fileChange(e) {
    e.persist();
    /* todo bug */
    console.log('file change');
    this.setState(
      {
        file: e.target.files[0]
      },
      () => {
        this.submit().finally(() => {
          e.target.value = '';
        });
      }
    );
  }
  submit() {
    let formData = new FormData();
    formData.append('file', this.state.file);

    return API.userfile(formData)
      .then(res => {
        if (res.status === 200) {
          let { data } = res;
          console.log('upload file succeed!');
          this.alterAvatar(data.url);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
  alterAvatar(avatar) {
    if (!avatar) {
      console.log('avatar can not be empty!');
      return;
    }
    API.avatar({ avatar }).then(res => {
      if (res.status === 200) {
        let { data } = res;
        console.log('alterAvatar succeed!');
        this.props.setUser(data);
      }
    });
  }
  loadData() {
    API.user().then(res => {
      if (res.status === 200) {
        let { data } = res;
        this.props.setUser(data);
      }
    });
  }
  render() {
    let { user } = this.props;
    return (
      <Page>
        <div className='my-avatar'>
          {user && user.avatar ? (
            <img className='my-avatar-img' src={user && user.avatar} />
          ) : null}
          <input
            className='my-userfile'
            type='file'
            name='userfile'
            title='点击上传'
            onChange={this.fileChange}
          />
        </div>
        <h4 className='my-name'>{user && user.username}</h4>
        <div className='my-email'>{user && user.email}</div>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    logined: state.loginStatus.logined,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setUser: (...args) => dispatch(setUser(...args))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPage);
