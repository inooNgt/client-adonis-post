import React from 'react';
import { connect } from 'react-redux';
import API from 'utils/api';
import Page from 'components/page';
import { setUser } from 'store/actions';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

import './index.scss';

class NotePage extends React.Component {
  constructor(props) {
    super(props);
  }
  state = { notes: [], page: 1, lastPage: 999 };

  componentDidMount() {
    this.loadData();
  }
  loadData(page = 1) {
    if (page > this.state.lastPage) {
      console.log('没有数据了');
      return;
    }
    API.notes({ params: { page, perPage: 100 } })
      .then(res => {
        if (res.status === 200) {
          let { data } = res;
          this.setState((state, props) => {
            return {
              showError: false,
              notes: data.data,
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
  loadDataError = () => {};
  render() {
    return (
      <Page>
        <div className='my-note'>
          <Link to='/editnote'>
            <Fab color='primary' aria-label='Add'>
              <AddIcon />
            </Fab>
          </Link>
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
)(NotePage);
