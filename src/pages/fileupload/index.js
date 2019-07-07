import React from 'react';
import { connect } from 'react-redux';
import API from 'utils/api';
import Page from 'components/page';
import { setUser } from 'store/actions';

import './index.scss';
import uploadIcon from 'static/image/upload.svg';

class FileUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: [], file: null };
    this.fileChange = this.fileChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {}

  componentWillReceiveProps() {}

  componentDidUpdate() {}

  fileChange(e) {
    e.persist();
    let file = e.target.files[0];
    // 生成一个指向Blob的地址
    const url = URL.createObjectURL(file);
    console.log('file change', file, url);
    this.setState({ file }, () => {
      this.submit().finally(() => {
        e.target.value = '';
      });
    });
  }
  submit() {
    let formData = new FormData();
    formData.append('file', this.state.file);

    return API.fileupload(formData)
      .then(res => {
        if (res.status === 200) {
          let { data } = res;
          console.log('upload file succeed!');
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <Page>
        <div className='file-upload-cell'>
          <img className='file-upload-icon' src={uploadIcon} />
          <input
            className='file-upload-input'
            type='file'
            name='fileupload'
            title='点击上传文件'
            onChange={this.fileChange}
          />
        </div>
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
)(FileUploader);
