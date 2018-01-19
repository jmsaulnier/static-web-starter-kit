import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Check component
 */

export default class Check extends Component {
  static get propTypes() {
    return {
      color: PropTypes.string,
      width: PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      color: '#fff',
      width: '100px',
    };
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { color, width } = this.props;

    return (
      <svg style={{ width }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.9 33.67">
        <line
          fill="none" stroke={color} strokeLinecap="round" strokeMiterlimit={10} strokeWidth="2px"
          x1="8.25" y1="14.42" x2="16.59" y2="22.76"
        />
        <line
          fill="none" stroke={color} strokeLinecap="round" strokeMiterlimit={10} strokeWidth="2px"
          x1="36.9" y1="2.57" x2="16.73" y2="22.74"
        />
        <path fill="none" stroke={color} strokeLinecap="round" strokeMiterlimit={10} strokeWidth="2px"
          d="M679,362.25a16,16,0,0,0-5.46-2.65,15.84,15.84,0,0,0-6.27-.36,15.6,15.6,0,0,0-5.93,2.09,15.84,15.84,0,0,0-7.53,15.81,15.84,15.84,0,0,0,23.83,11.35,15.84,15.84,0,0,0,7.53-15.8"
          transform="translate(-652.66 -358.08)"
        />
      </svg>
    );
  }
}
