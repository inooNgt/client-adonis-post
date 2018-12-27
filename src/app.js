import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import store from 'store/store';
import routes from './routes';
import Nav from 'components/nav/index';
import PageContainer from 'components/PageContainer';

import './scss/index.scss';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route
            render={({ location }) => {
              return (
                <PageContainer>
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
                </PageContainer>
              );
            }}
          />
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
