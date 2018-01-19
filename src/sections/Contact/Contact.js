import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import Theme from 'src/styles/theme';

import IconCheck from 'src/components/Icons/Check';

import styles from './Contact.css';

/**
 * Contact component
 */
export default class Contact extends PureComponent {
  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <section className={styles.root}>
        <h2><IconCheck width="20px" color={Theme.blue} /> Contact section!</h2>
        <aside className={styles.navigation}>
          <Link to="/">← Back</Link>
        </aside>
      </section>
    );
  }
}
