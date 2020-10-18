import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';

import Landing from './pages/Landing';
import OrphanageMap from './pages/OrphanageMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/app" component={OrphanageMap} />
        <Route exact path="/orphanages/create" component={CreateOrphanage} />
        <Route exact path="/orphanages/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;