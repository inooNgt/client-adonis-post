import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Page from 'components/page';
import API from 'utils/api';
import config from 'utils/config';
import { setLoginStatus, setUser } from 'store/actions';

import './index.scss';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', email: '' };
  }

  nameChange = e => {
    this.setState({ username: e.target.value });
  };
  emailChange = e => {
    this.setState({ email: e.target.value });
  };

  passwordChange = e => {
    this.setState({ password: e.target.value });
  };

  submit = e => {
    e.preventDefault();
    let { history } = this.props;

    API.register({
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    })
      .then(res => {
        if (res.status == 200) {
          let { data } = res;
          let { token } = data;
          localStorage.setItem(config.keys.token, token);
          this.props.setLoginStatus(true);
          history.replace('/my');
          API.user().then(res => {
            if (res.status === 200) {
              let { data } = res;
              this.props.setUser(data);
            }
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    return (
      <Page>
        <div className='form-img' />
        <form
          className='form-content'
          action='javascript:;'
          onSubmit={this.submit}
        >
          <div className='form-row'>
            <TextField
              label='username'
              name='name'
              autoComplete='on'
              onChange={this.nameChange}
              defaultValue=''
            />
          </div>
          <div className='form-row'>
            <TextField
              label='email'
              name='name'
              autoComplete='on'
              onChange={this.emailChange}
              defaultValue=''
            />
          </div>
          <div className='form-row'>
            <TextField
              label='password'
              name='password'
              type='password'
              autoComplete='on'
              onChange={this.passwordChange}
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
              Register
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
    setLoginStatus: (...args) => dispatch(setLoginStatus(...args)),
    setUser: (...args) => dispatch(setUser(...args))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
