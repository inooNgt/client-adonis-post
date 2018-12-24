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
  render() {
    let { list } = this.state;
    const { className, children } = this.props;

    return (
      <nav className={`page-nav ${className || ''}`}>
        <div className='nav-inner'>
          <div className='nav-logo'>Adonis Post</div>
          <ul>
            {list.map((item, index) => (
              <NavLink
                exact
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

// const mapStateToProps = state => {
//   return {
//     logined: state.logined
//   };
// };

// const Nav = connect(mapStateToProps)(_Nav);

export default Nav;
