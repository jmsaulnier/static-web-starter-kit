import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './Header.css';

/**
 * Header component
 */

export default class Header extends PureComponent {

  static get propTypes() {
    return {
      children: PropTypes.element,
    };
  }

  static get defaultProps() {
    return {
      children: null,
    };
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <header className={styles.Header}>
        <span className={styles.actions}>
          {this.props.children}
        </span>
      </header>
    );
  }
}
