import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TweenLite } from 'gsap';

import styles from './HamburgerButton.css';

/**
 * HamburgerButton component
 */

export default class HamburgerButton extends Component {
  static get propTypes() {
    return {
      className: PropTypes.string,
      tabIndex: PropTypes.number,
    };
  }

  static get defaultProps() {
    return {
      className: '',
      tabIndex: 0,
    };
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { className, tabIndex } = this.props;

    return (
      <button
        className={`${styles.root} ${className}`}
        tabIndex={tabIndex}
      >
        <div className={styles.container}>
          {
            [0, 1, 2].map(item => <div key={item} className={styles.bar} />)
          }
        </div>
      </button>
    );
  }
}
