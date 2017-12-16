import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TweenLite } from 'gsap';

import { getStatus } from 'src/api/github';

import styles from './Home.css';

/**
 * Home section
 */
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ['HTML5 Boilerplate', 'React.js', '... & more'],
    };

    this.$title = null;
  }

  /**
   * componentDidMount
   */
  async componentDidMount() {
    const result = await getStatus();
    console.log(result);

    this.animateIn();
  }

  animateIn() {
    TweenLite.to(this.$title, 1, { opacity: 0 }).then(() => {
      console.log('Done animating title');
    });
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <section className={styles.Home}>
        <h1 ref={(el) => { this.$title = el; }}>Allo!</h1>
        <p>You now have:</p>
        <ul>
          {this.state.items.map(item => <li key={item}><span> {item}</span></li>)}
        </ul>
        <aside className={styles.navigation}>
          <Link to="/contact">&#9998; <b>Contact</b></Link>
        </aside>
      </section>
    );
  }
}
