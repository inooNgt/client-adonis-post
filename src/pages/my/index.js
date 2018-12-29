import React from 'react';
import { connect } from 'react-redux';
import { get } from 'utils/http';
import API from 'utils/api';
import Page from 'components/page';

import './index.scss';

class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: [], file: null };
    this.fileChange = this.fileChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }
  fileChange(e) {
    console.log(e);
    e.persist();
    this.setState({
      file: e.target.files[0]
    });
  }
  submit() {
    let formData = new FormData();
    formData.append('file', this.state.file);

    API.userfile(formData)
      .then(res => {
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  loadData() {
    API.user().then(res => {
      if (res.status === 200) {
        let { data } = res;
        this.setState({
          user: data.user
        });
      }
    });
  }
  render() {
    let { user } = this.state;
    return (
      <Page>
        <form action='javascript:;'>
          <input type='file' name='userfile' onChange={this.fileChange} />
          <button type='submit' onClick={this.submit}>
            {' '}
            Submit{' '}
          </button>
        </form>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    logined: state.logined
  };
};

export default connect(mapStateToProps)(MyPage);
