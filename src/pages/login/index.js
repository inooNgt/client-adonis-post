import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Page from 'components/page';
import { post } from 'utils/http';
import API from 'utils/api';
import config from 'utils/config';
import actions from 'store/actions';

import './index.scss';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  nameChange(e) {
    this.setState({ username: e.target.value });
  }

  passwordChange(e) {
    this.setState({ password: e.target.value });
  }

  submit(e) {
    e.preventDefault();
    let { history } = this.props;

    post(API.login, {
      username: this.state.username,
      password: this.state.password
    })
      .then(res => {
        if (res.status == 200) {
          let { data } = res;
          let { token } = data;
          localStorage.setItem(config.keys.token, token);
          history.replace('/');
          this.props.setLoginStatus(true);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <Page>
        <div className='form-img' />
        <form
          className='form-content'
          action='javascript:;'
          onSubmit={this.submit.bind(this)}
        >
          <div className='form-row'>
            <TextField
              label='用户名'
              name='name'
              autoComplete='on'
              onChange={this.nameChange.bind(this)}
              defaultValue=''
            />
          </div>
          <div className='form-row'>
            <TextField
              label='密码'
              name='password'
              type='password'
              autoComplete='on'
              onChange={this.passwordChange.bind(this)}
              defaultValue=''
            />
          </div>
          <div className='row-btn'>
            <Button
              variant='contained'
              color='primary'
              size='large'
              type='submit'
            >
              登录
            </Button>
          </div>
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setLoginStatus: (...args) => dispatch(actions.setLoginStatus(...args))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
