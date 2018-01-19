import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import domready from 'domready';

import { configureStore } from './store/configure';
import registerServiceWorker from './registerServiceWorker';
import App from './sections/App';

domready(() => {
  const store = configureStore();

  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <Route path="/" component={App} />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );

  if (__DEVELOPMENT__) {
    if (module.hot) {
      module.hot.accept();
    }
  }

  registerServiceWorker();
});
