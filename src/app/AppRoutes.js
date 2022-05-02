import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

//const Buttons = lazy(() => import('./basic-ui/Buttons'));
//const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));
//const Typography = lazy(() => import('./basic-ui/Typography'));

const BasicElements = lazy(() => import('./form-elements/BasicElements'));

const BasicTable = lazy(() => import('./tables/BasicTable'));

const Loja = lazy(() => import('./Loja/loja'));

const Seccao = lazy(() => import('./Loja/Seccao'));

const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));

const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));


class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/dashboard" component={ Dashboard } />

          <Route path="/dashboard/continente/cntnorte" component={ Dashboard } />
          <Route path="/dashboard/continente/cntcentro" component={ Dashboard } />
          <Route path="/dashboard/continente/cntsul" component={ Dashboard } />

          <Route path="/dashboard/modelo/cmnorte" component={ Dashboard } />
          <Route path="/dashboard/modelo/cmcentro" component={ Dashboard } />
          <Route path="/dashboard/modelo/cmsul" component={ Dashboard } />

          <Route path="/dashboard/bomdia/cbdnorte" component={ Dashboard } />
          <Route path="/dashboard/bomdia/cbdcentro" component={ Dashboard } />
          <Route path="/dashboard/bomdia/cbdsul" component={ Dashboard } />

          <Route path="/tables/basic-table" component={ BasicTable } />
          
          <Route path="/form-Elements/basic-elements" component={ BasicElements } />

          <Route path="/Loja/loja" component={ Loja } />

          <Route path="/Suporte" component={ Seccao } />
          <Route path="/Caixas" component={ Seccao } />
          <Route path="/Textil" component={ Seccao } />
          <Route path="/Alimentar" component={ Seccao } />
          <Route path="/NAlimentar" component={ Seccao } />
          <Route path="/Frescos" component={ Seccao } />

          <Route path="/user-pages/login-1" component={ Login } />
          <Route path="/user-pages/register-1" component={ Register1 } />

          <Route path="/error-pages/error-404" component={ Error404 } />
          <Route path="/error-pages/error-500" component={ Error500 } />

          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;