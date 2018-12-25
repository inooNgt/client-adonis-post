import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import store from 'store/store';
import routes from './routes';
import Nav from 'components/nav/index';

import './scss/index.scss';

class App extends React.Component {
  componentDidMount() {}
  checkLogin() {
    /**
     *  todo
     */
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route
            render={({ location }) => {
              return (
                <div className='page-container'>
                  <Nav location={location} />
                  <TransitionGroup>
                    <CSSTransition
                      key={location.key}
                      classNames='fade'
                      timeout={300}
                    >
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
                </div>
              );
            }}
          />
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
