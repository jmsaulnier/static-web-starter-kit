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

  const render = () => {
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
  };

  render(App, store);

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./sections/App', () => {
        render();
      });
    }
  }

  registerServiceWorker();
});
