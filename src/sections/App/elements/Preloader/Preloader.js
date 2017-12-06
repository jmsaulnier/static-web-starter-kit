import React, { Component } from 'react';
import PropTypes from 'prop-types';

import preloader from 'preloader';

import styles from './Preloader.css';

/**
 * Preloader component
 */
export default class Preloader extends Component {

  static get propTypes() {
    return {
      onLoaded: PropTypes.func,
      onHidden: PropTypes.func,
    };
  }

   static get defaultProps() {
		return {
			stageHeight: 0,
			onLoaded: f => f,
      onHidden: f => f,
		};
	}

  constructor(props, context) {
    super(props, context);
    this.state = {
      progress: 0,
    };
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    this.load();
  }

  /**
   * componentWillUnmount
   */
  componentWillUnmount() {
    this.loader = null;
  }

  /**
   * loaderProgressHandler
   */
  loaderProgressHandler(progress) {
    this.setState({ progress });
  }

  /**
   * loaderCompleteHandler
   */
  loaderCompleteHandler() {
    this.props.onLoaded();
    this.hide();
  }

  /**
   * load
   */
  load() {
    this.loader = preloader({ xhrImages: false });
    this.loader.on('progress', () => this.loaderProgressHandler());
    this.loader.on('complete', () => this.loaderCompleteHandler());

    this.loader.addImage('assets/images/yeoman.png');

    this.loader.load();
  }

  /**
   * hide
   */
  hide() {
    this.props.onHidden();
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { progress } = this.state;

    return (
      <div className={styles.Preloader}>
        <p data-f1="title">Loading... {progress} / 100</p>
        <span data-f1="progressbar" className={styles.progressbar} />
      </div>
    );
  }
}
