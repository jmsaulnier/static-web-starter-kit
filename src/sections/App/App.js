import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './elements/Header';
import Preloader from './elements/Preloader';

import HomePage from 'src/sections/HomePage';
import ContactPage from 'src/sections/ContactPage';

import styles from './App.css';

/**
 * App component
 */
export default class App extends Component {

  static get propTypes() {
    return {
      windowResize: PropTypes.func.isRequired, // browser action
    };
  }

  static get defaultProps() {
    return {
      windowResize: f => f,
    };
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      isPreloaderLoaded: false,
      isPreloaderHidden: false,
    };

    window.addEventListener('resize',
      debounce(() => props.windowResize(window.innerWidth, window.innerHeight), 200)
    );

    props.windowResize(window.innerWidth, window.innerHeight);
  }

  /**
   * preloaderLoadedHandler
   */
  preloaderLoadedHandler() {
    this.setState({
      isPreloaderLoaded: true,
    });
  }

  /**
   * preloaderHiddenHandler
   */
  preloaderHiddenHandler() {
    this.setState({
      isPreloaderHidden: true,
    });
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { isPreloaderHidden, isPreloaderLoaded } = this.state;

    return (
      <div className={styles.App}>
        {!isPreloaderHidden && <Preloader
          onLoaded={() => this.preloaderLoadedHandler()}
          onHidden={() => this.preloaderHiddenHandler()}
        />}

        {isPreloaderLoaded && <div>
          <Header />
          <BrowserRouter>
            <div>
              <Route exact path="/" component={HomePage} />
              <Route path="/contact" component={ContactPage} />
            </div>
          </BrowserRouter>
        </div>}

      </div>
    );
  }
}
