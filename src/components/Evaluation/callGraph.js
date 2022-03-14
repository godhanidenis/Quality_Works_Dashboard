import React from "react";
import voiceIcon from "../../assest/icon/VoiceStop.svg";
import Slider from "@mui/material/Slider";
import { EvaluationDetail } from "../../CONST";

const CallGraph = () => {
  return (
    <div className="evaluation-card">
      <div className="d-flex justify-content-between evaluation-date-content">
        <div>
          <span className="fw-bold fs-14 text-black font-inter">
            {EvaluationDetail.name || ""}
          </span>{" "}
          on -
          <span className="fw-500 text-black font-inter">
            {EvaluationDetail.dateAndTime || ""}
          </span>
        </div>
        <div className="font-inter">
          <span className="fw-500 fs-14 text-black font-inter">
            Call Duration:
          </span>
          <span className="fw-bold fs-14 text-black pl-8 font-inter">
            {EvaluationDetail.callDuration || ""}
          </span>
          <span className="fw-500 fs-14 text-black pl-30 font-inter">
            Call ID:
          </span>
          <span className="fw-bold fs-14 text-black pl-8 font-inter">
            {EvaluationDetail.callId || ""}
          </span>
        </div>
      </div>
      <div className="gray-divider mb-50" />
      <div className="pl-100">
        <div className="d-flex">
          <div className="fs-14 text-blue fw-bold mw-75 text-right font-inter">
            Agent
          </div>
          <div className="ml-25 voice-data" />
        </div>
        <div className="d-flex mt-8">
          <div className="fs-14 text-blue fw-bold text-orange mw-75 text-right font-inter">
            Customer
          </div>
          <div className="ml-25 voice-data" />
        </div>
      </div>
      <div className="mt-65 gray-divider" />
      <div className="audio-line">
        <div className="d-flex align-item-center">
          <img src={voiceIcon} alt="voiceIcon" />
          <div className="ml-12 mr-25 fs-14 light-gray font-inter">
            1:33/4:15
          </div>
          <Slider
            defaultValue={50}
            aria-label="Default"
            valueLabelDisplay="auto"
          />
        </div>
      </div>
    </div>
  );
};

export default CallGraph;
