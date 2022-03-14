import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';
import sliderIcon from "../../../../assest/icon/sliderIcon.svg"

class ProgressBar extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    return !isEqual(this.props, nextProps);
  }

  handleOnChange = (e) => {
    this.props.buttonClick(e);
  }

  render() {
    return (
      <div className="slidecontainer">
        <img src={sliderIcon} alt="slider-icon" className="slider-icon" style={{marginLeft: `${(this.props.value/this.props.max)*100}%`}}/>
        <input
          type='range'
          className="custom-slider"
          onChange={ this.handleOnChange }
          value={ this.props.value }
          id="custom-slider"
          min='0'
          max={ this.props.max.toString() }
        />
      </div>
    );
  }
}

ProgressBar.propTypes = {
  value: PropTypes.string,
  max: PropTypes.string,
  buttonClick: PropTypes.func
};

ProgressBar.defaultProps = {
  value: '0',
  max: '0',
};

export default ProgressBar;
