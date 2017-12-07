import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './Header.css';

/**
 * Header component
 */

export default class Header extends Component {

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <header className={styles.Header}>
        <ul>
          <li>
            <NavLink to="/" pathname="/" strict exact activeClassName={styles.isActive}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" strict pathname="/contact" activeClassName={styles.isActive}>
              Contact
            </NavLink>
          </li>
        </ul>
      </header>
    );
  }
}
