import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import styles from './Contact.css';

/**
 * ContactPage component
 */
export default class Contact extends PureComponent {
  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <section className={styles.Contact}>
        <h2> Contact section!</h2>
        <aside className={styles.navigation}>
          <Link to="/">← Back</Link>
        </aside>
      </section>
    );
  }
}
