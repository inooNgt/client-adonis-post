import React from 'react';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import { NavLink, Link } from 'react-router-dom';
import StateBar from './statebar';
import './index.scss';

const DEF_NAV_LIST = [
  {
    title: 'Posts',
    path: '/'
  }
];

const LogoutedState = () => {
  return (
    <React.Fragment>
      <Link to='/Login'>Login</Link>
    </React.Fragment>
  );
};

class Nav extends React.Component {
  state = { list: DEF_NAV_LIST };
  componentWillReceiveProps(newProps) {
    let { logined } = newProps;
    if (logined) {
    }
  }
  render() {
    let { list } = this.state;
    const { className, location, user, logined } = this.props;
    return (
      <nav className={`page-nav ${className || ''}`}>
        <div className='nav-inner'>
          <Link to='/' className='nav-logo'>
            inooNgt
          </Link>
          <div className='nav-bar'>
            <ul>
              {list.map((item, index) => (
                <NavLink
                  exact
                  location={location}
                  className='nav-link'
                  activeClassName='nav-link-active'
                  to={item.path}
                  key={index}
                >
                  {item.title}
                </NavLink>
              ))}
            </ul>
            {logined ? <StateBar user={user} /> : <LogoutedState />}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    logined: state.loginStatus.logined,
    user: state.user
  };
};

export default connect(mapStateToProps)(Nav);

// export default Nav;
