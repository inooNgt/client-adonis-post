import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import './index.scss';

const DEF_NAV_LIST = [
  {
    title: 'Posts',
    path: '/'
  },
  {
    title: 'Login',
    path: '/login'
  }
];

let loginNavList = [...DEF_NAV_LIST];
loginNavList.splice(1, 1, {
  title: 'My',
  path: '/my'
});

const StateBar = ({ user }) => {
  return (
    <div className='nav-bar-right'>
      <Link to='/create' className='nav-add'>
        +
      </Link>
      <Link to='/my' className='nav-avatar-link'>
        {user && user.avatar ? (
          <img className='nav-avatar' src={user && user.avatar} />
        ) : null}
      </Link>
    </div>
  );
};

class Nav extends React.Component {
  state = { list: DEF_NAV_LIST };
  componentWillReceiveProps(newProps) {
    let { logined } = newProps;
    if (logined) {
      this.setState({
        list: loginNavList
      });
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
            {logined ? <StateBar user={user} /> : null}
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
