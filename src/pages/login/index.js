import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { post } from 'utils/http';
import API from 'utils/api';

import './index.scss';

export default class LoginPage extends React.Component {
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

    post(API.auth.login, {
      username: this.state.username,
      password: this.state.password
    })
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <section>
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
              id='username'
              onChange={this.nameChange.bind(this)}
              defaultValue=''
            />
          </div>
          <div className='form-row'>
            <TextField
              label='密码'
              id='password'
              name='password'
              type='password'
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
      </section>
    );
  }
}
