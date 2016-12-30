import React from 'react';
import {
  Router,
  Route,
  browserHistory,
  IndexRoute,
} from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import store from 'store';

import App from 'components/App';
import Home from 'components/Home';
import FallingSandGame from 'components/FallingSandGame';
import Resume from 'components/Resume';
import ResumeOverview from 'components/ResumeOverview';
import ResumeExperience from 'components/ResumeExperience';
import ResumeSkills from 'components/ResumeSkills';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

export default () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="fsg" component={FallingSandGame} />
        <Route path="resume" component={Resume}>
          <IndexRoute component={ResumeOverview} />
          <Route path="experience" component={ResumeExperience} />
          <Route path="skills" component={ResumeSkills} />
        </Route>
      </Route>
    </Router>
  </Provider>
);
