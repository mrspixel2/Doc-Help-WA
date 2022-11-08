import React, { useEffect, useLayoutEffect, useState } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import VerticalLayout from './layout/vertical/Vertical';
import HorizontalLayout from './layout/horizontal/Horizontal';

import NotFound from './pages/sessions/404';
import { defaultRoutes, sessionRoutes } from './routing';

import './App.scss';
import { useHideLoader } from './hooks/useHideLoader';
import axios from 'axios';

const Routes = ({ routes, layout = '' }) => (
  <Switch>
    {routes.map((route, index) => (
      <Route
        key={index}
        exact={route.exact}
        path={layout.length > 0 ? `/${layout}/${route.path}` : `/${route.path}\``}
        component={() => <route.component />}
      />
    ))}

    <Route path='*'>
      <Redirect to='/public/page-404' />
    </Route>
  </Switch>
);

const DefaultRoutes = ({ layout }) => <Routes routes={defaultRoutes} layout={layout} />;

const SessionRoutes = () => <Routes routes={sessionRoutes} layout='public' />;

const App = () => {
  useHideLoader();
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log('fetching current user');
    axios.post('http://localhost:5000/user/me')
      .then(
        response => {
          setUser(response);
          console.log(response);
          alert(response)
        }
      ).catch(err => console.log('Something went wrong'))
  })



  return (
    <Switch>
      <Route path='/' exact>
        <Redirect to='/public/sign-in' />
      </Route>

      <Route path='/public'>
        <SessionRoutes />
      </Route>

      <Route path='/horizontal'>
        <HorizontalLayout>
          <DefaultRoutes layout='horizontal' />
        </HorizontalLayout>
      </Route>

      <Route path='/vertical'>
        <VerticalLayout>
          <DefaultRoutes layout='vertical' />
        </VerticalLayout>
      </Route>

      <Route path='*'>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default App;
