import React from "react";
import isEqual from "react-fast-compare";

import { faTv, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlaybackRate from "../PlaybackRate";
import TimeBox from "./TimeBox.js";

import style from "./index.module.scss";

class PlayerControls extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    return !isEqual(this.props, nextProps);
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const pictureInPicture =
      "pictureInPictureEnabled" in document ? (
        <button
          value="Picture-in-picture"
          title="Picture-in-picture"
          className={`${style.playerButton} ${style.pip}`}
          onClick={this.props.pictureInPicture}
        >
          <FontAwesomeIcon icon={faTv} />
        </button>
      ) : null;

    return (
      <>
        <div className="d-flex">
          <div className="d-flex align-item-center rangeBar">
            <button
              value="Play/Pause: alt k"
              title="Play/Pause: alt k"
              className="pause-start-button"
              onClick={this.props.playMedia}
            >
              {this.props.isPlaying ? (
                <FontAwesomeIcon icon={faPause} />
              ) : (
                <FontAwesomeIcon icon={faPlay} />
              )}
            </button>
            <TimeBox
              promptSetCurrentTime={this.props.promptSetCurrentTime}
              currentTime={this.props.currentTime}
              duration={this.props.duration}
            />
            {this.props.mediaUrl ? this.props.progressBar : null}
          </div>
          <div className="pl-20">
            <PlaybackRate
              playbackRateOptions={this.props.playbackRateOptions}
              playbackRate={this.props.playbackRate}
              name={"playbackRate"}
              handlePlayBackRateChange={this.props.setPlayBackRate}
            />
          </div>
        </div>
      </>
    );
  }
}

export default PlayerControls;
