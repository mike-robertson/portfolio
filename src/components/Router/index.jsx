import React from 'react';
import {
  Router,
  Route,
  browserHistory,
  IndexRoute,
} from 'react-router';

import App from 'components/App';
import Home from 'components/Home';
import FallingSandGame from 'components/FallingSandGame';
import Resume from 'components/Resume';
import ResumeOverview from 'components/ResumeOverview';
import ResumeExperience from 'components/ResumeExperience';

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="fsg" component={FallingSandGame} />
      <Route path="resume" component={Resume}>
        <IndexRoute component={ResumeOverview} />
        <Route path="experience" component={ResumeExperience} />
      </Route>
      {/* <Route path="*" component={FourOhFour} /> */}
    </Route>
  </Router>
);
