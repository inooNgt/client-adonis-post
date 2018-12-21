import React from 'react';
import ReactDOM from 'react-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';
import Nav from 'components/nav/index';

import './scss/index.scss';

const NAV_LIST = [
  {
    title: 'Posts',
    path: '/'
  },
  {
    title: 'Login',
    path: '/login'
  }
];

const App = (props, context) => (
  <Router>
    <div className='page-container'>
      <Nav list={NAV_LIST} />
      <Route
        render={({ location }) => {
          return (
            <TransitionGroup>
              <CSSTransition key={location.key} classNames='fade' timeout={300}>
                {/*due to the component of is async,
                 * use a div as container of CSSTransition
                 */}
                <div>
                  <Switch location={location}>
                    {routes.map(route => (
                      <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                      />
                    ))}
                    <Route
                      render={({ location }) => (
                        <div>no match for path {location.pathname}</div>
                      )}
                    />
                  </Switch>
                </div>
              </CSSTransition>
            </TransitionGroup>
          );
        }}
      />
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('app'));
