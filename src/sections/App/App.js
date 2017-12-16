import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { Route, Switch } from 'react-router-dom';

import Header from './elements/Header';

import Home from 'src/sections/Home';
import Contact from 'src/sections/Contact';
import NotFound from 'src/sections/NotFound';

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

  constructor(props, context) {
    super(props, context);
    this.state = {};

    window.addEventListener(
      'resize',
      debounce(() => props.windowResize(window.innerWidth, window.innerHeight), 200),
    );

    props.windowResize(window.innerWidth, window.innerHeight);
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <section className={styles.App}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </section>
    );
  }
}
