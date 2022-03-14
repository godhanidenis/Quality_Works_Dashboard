import React from "react";
import isEqual from "react-fast-compare";

class TimeBox extends React.Component {
  shouldComponentUpdate = (nextProps) => {

    return !isEqual(this.props, nextProps);
  };

  handleClick = (e) => {
    this.props.promptSetCurrentTime(e);
  };

  render() {
    return (
      <div className="bg-unset ml-8 mw-165">
        <span
          title="Current time: alt t"
          className="text-gray fs-14 fw-500"
          onClick={this.handleClick}
        >
          {this.props.currentTime}
        </span>
        <span className="text-gray">/</span>
        <span title="Clip duration" className="text-gray fs-14 fw-500">
          {this.props.duration}
        </span>
      </div>
    );
  }
}

export default TimeBox;
