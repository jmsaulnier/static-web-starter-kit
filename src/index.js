import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter, Match } from 'react-router';
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
          <App />
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
