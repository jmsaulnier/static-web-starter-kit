import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

import reducers from './reducers';

const history = createHistory();

const configureStore = () => {
  let store;

  if (process.env.NODE_ENV === 'development') {
    const enhancer = compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    );
    store = createStore(reducers, enhancer);
  } else {
    const middleware = applyMiddleware(thunk);
    store = middleware(createStore)(reducers);
  }

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept(
        './reducers',
        () => store.replaceReducer(require('./reducers')), // eslint-disable-line global-require
      );
    }
  }

  return store;
};

export {
  configureStore,
  history,
};
