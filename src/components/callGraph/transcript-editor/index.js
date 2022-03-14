import React from "react";
import TimedTextEditor from "../timed-text-editor";
import { secondsToTimecode } from "../util/timecode-converter";

class TranscriptEditor extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();

    this.state = {
      transcriptData: null,
      isScrollIntoViewOn: true,
      isPauseWhileTypingOn: true,
      showTimecodes: true,
      showSpeakers: true,
      gridDisplay: null,
    };
    this.timedTextEditorRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.transcriptData !== null) {
      return {
        transcriptData: nextProps.transcriptData,
      };
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.transcriptData !== this.props.transcriptData) {
      this.setState({ transcriptData: this.props.transcriptData });
    }
  }

  // performance optimization
  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextProps.mediaUrl !== this.props.mediaUrl) {
      return true;
    }

    return nextState !== this.state;
  };

  componentDidMount = () => {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  };

  updateDimensions = () => {
    let gridDisplay = {
      display: "grid",
      gridTemplateColumns: "1fr 3fr",
      gridColumnGap: "1em",
    };
    let displayMedia = null;
    // if the mediaUrl is for an audio file, then extend TimedTextEditor to be full width
    if (this.props.mediaType === "audio") {
      console.log("this.props.mediaType", this.props.mediaType);
      gridDisplay = null;
      displayMedia = { display: "none" };
    }
    // Handeling mobile view
    const width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    if (width <= 767) {
      gridDisplay = null;
    }
    this.setState({
      gridDisplay,
      displayMedia,
    });
  };

  // eslint-disable-next-line class-methods-use-this
  handleWordClick = (startTime) => {
    if (this.props.handleAnalyticsEvents) {
      this.props.handleAnalyticsEvents({
        category: "TranscriptEditor",
        action: "doubleClickOnWord",
        name: "startTime",
        value: secondsToTimecode(startTime),
      });
    }

    this.props.setCurrentTime(startTime);
  };

  handlePlayMedia = (isPlaying) => {
    this.playMedia(isPlaying);
  };

  handleIsPlaying = () => {
    return this.isPlaying();
  };

  getEditorContent = (exportFormat) => {
    const title = this.props.title ? this.props.title : "";

    return this.timedTextEditorRef.current.getEditorContent(
      exportFormat,
      title
    );
  };

  handleAutoSaveChanges = (data) => {
    if (this.props.handleAutoSaveChanges) {
      this.props.handleAutoSaveChanges(data);
    }
  };

  render() {
    let contentFormat = "draftjs";
    if (this.props.autoSaveContentType) {
      contentFormat = this.props.autoSaveContentType;
    } else if (this.props.sttJsonType) {
      contentFormat = this.props.sttJsonType;
    }

    const timedTextEditor = (
      <TimedTextEditor
        fileName={this.props.fileName}
        transcriptData={this.state.transcriptData}
        timecodeOffset={this.props.timecodeOffset}
        onWordClick={this.handleWordClick}
        playMedia={this.handlePlayMedia}
        isPlaying={this.handleIsPlaying}
        currentTime={this.props.currentTime}
        isEditable={this.props.isEditable}
        spellCheck={this.props.spellCheck}
        sttJsonType={this.props.sttJsonType}
        mediaUrl={this.props.mediaUrl}
        isScrollIntoViewOn={this.state.isScrollIntoViewOn}
        isPauseWhileTypingOn={this.state.isPauseWhileTypingOn}
        showTimecodes={this.state.showTimecodes}
        showSpeakers={this.state.showSpeakers}
        ref={this.timedTextEditorRef}
        handleAnalyticsEvents={this.props.handleAnalyticsEvents}
        handleAutoSaveChanges={this.handleAutoSaveChanges}
        autoSaveContentType={contentFormat}
        title={this.props.title ? this.props.title : Date.now()}
      />
    );

    return (
      <div>
        <div style={{ display: "flex" }}>
          <main>
            {this.props.mediaUrl && this.props.transcriptData
              ? timedTextEditor
              : null}
          </main>
        </div>
      </div>
    );
  }
}

export default TranscriptEditor;
