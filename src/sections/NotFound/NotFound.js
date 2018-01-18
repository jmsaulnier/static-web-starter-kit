import React, { PureComponent } from 'react';

import styles from './NotFound.css';

/**
 * NotFound component
 */
export default class NotFound extends PureComponent {
  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <section className={styles.root}>
        <h1>Doh! 404!</h1>
        <p>These are <em>not</em> the droids you are looking for!</p>
      </section>
    );
  }
}
