import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Menu from './page/Menu';
import Sale from './page/Sale';
import Sobre from './page/Sobre';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Menu} />
      <Route path="/sale" component={Sale} />
      <Route path="/sobre" component={Sobre} />
    </Switch>
  );
};

export default Routes;
