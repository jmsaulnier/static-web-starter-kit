import { connect } from 'react-redux';

import App from './App';

import { windowResize } from 'src/store/modules/browser';

export default connect(null, { windowResize })(App);
