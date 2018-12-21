import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

export default class Nav extends React.Component {
  render() {
    const { list, className, children } = this.props;

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
