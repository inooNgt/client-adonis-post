import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './index.scss';

class Nav extends React.Component {
  state = {
    list: [
      {
        title: 'Posts',
        path: '/'
      },
      {
        title: 'Login',
        path: '/login'
      }
    ]
  };
  componentWillReceiveProps(newProps) {
    let { logined } = newProps;
    console.log('nav newProps', newProps);
    if (logined) {
      this.setState({
        list: [
          {
            title: 'Posts',
            path: '/'
          },
          {
            title: 'MY',
            path: '/my'
          }
        ]
      });
    }
  }
  render() {
    let { list } = this.state;
    const { className, location } = this.props;
    return (
      <nav className={`page-nav ${className || ''}`}>
        <div className='nav-inner'>
          <div className='nav-logo'>Adonis Post</div>
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
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    logined: state.loginStatus.logined
  };
};

export default connect(mapStateToProps)(Nav);

// export default Nav;
