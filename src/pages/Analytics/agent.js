import React from "react";
import { Box, Grid, Paper, styled } from "@mui/material";
import callIcon from "../../assest/analyticpage/totalCalls.svg";
import csatIcon from "../../assest/analyticpage/cast.svg";
import cqScoreIcon from "../../assest/analyticpage/cqScores.svg";
import rateSmallIcon from "../../assest/analyticpage/samplingRate.svg";
import CustomCard from "../../components/common/CustomCard";
import CloseIcon from "@material-ui/icons/Close";
import callOpening from "../../assest/analyticpage/callOpening.svg";
import customervariofication from "../../assest/analyticpage/customerVerification.svg";
import onholding from "../../assest/analyticpage/onHold.svg";
import paraphsingIcon from "../../assest/analyticpage/paraphrasing.svg";
import probingIcon from "../../assest/analyticpage/probing.svg";
import ActiveListening from "../../assest/analyticpage/activeListening.svg";
import curiosityIcon from "../../assest/analyticpage/curiosity.svg";
import informationaccuracyIcon from "../../assest/analyticpage/informationAccuracy.svg";
import criticalIcon from "../../assest/analyticpage/criticalMiss.svg";
import noncriticalIcon from "../../assest/analyticpage/nonCriticalMiss.svg";
import taggingIcon from "../../assest/analyticpage/tagging.svg";
import troublshootingIcon from "../../assest/analyticpage/trooubleshooting.svg";
import rateofspeechIcon from "../../assest/analyticpage/rateOfSpeech.svg";
import responsivenessIcon from "../../assest/analyticpage/responsiveness.svg";
import clarityIcon from "../../assest/analyticpage/clarity.svg";
import voicevolumeIcon from "../../assest/analyticpage/voiceVolume.svg";
import deadairIcon from "../../assest/analyticpage/deadAir.svg";
import overtalkincidentsIcon from "../../assest/analyticpage/overTalkIncidents.svg";
import silentIncidentsIcon from "../../assest/analyticpage/silentIncidents.svg";
import Typography from "@mui/material/Typography";
import { getCqScoreColor } from "../../utils/comman";
const Item = styled(Paper)(({ theme }) => ({
  //   ...theme.typography.body2,
  background: "#ffffff",
  borderRadius: "10px",
  boxShadow: "none",
}));

const salutationDetails = [
  {
    title: "Call Opening",
    slug: "call_opening_found",
    key: "call_opening",
    number: "60%",
    // icon: callOpening,
  },
  {
    title: "Customer Verification",
    key: "customer_verification",
    slug: "customer_verification_found",
    number: "20%",
    // icon: customervariofication,
  },
  {
    title: "On Hold",
    slug: "on_hold_found",
    key: "on_hold",
    number: "10%",
    // icon: onholding,
  },
    {
    title: "Call Refreshment",
    slug: "call_refreshment",
    key: "call_refreshment_True",
    number: "10%",
    // icon: onholding,
  },
];

const softSkillDetails = [
  {
    title: "Active Listening",
    key: "active_listening",
    slug: "active_listening_found",
    number: "20%",
    // icon: ActiveListening,
  },
  // {
  //   title: "Curiosity",
  //   key: "curiosity",
  //   slug: "curiosity_found",
  //   number: "20%",
  //   // icon: curiosityIcon,
  // },
  {
    title: "Paraphrasing",
    key: "paraphrasing",
    slug: "paraphrasing_found",
    number: "10%",
    // icon: paraphsingIcon,
  },
  {
    title: "Probing",
    key: "probing",
    slug: "probing_found",
    number: "20%",
    // icon: probingIcon,
  },
];

const callClosure = [
  {
    title: "Call Additional Info",
    key: "call_additional_info_True",
    slug: "call_additional_info",
    number: "20%",
    // icon: ActiveListening,
  },
  // {
  //   title: "Curiosity",
  //   key: "curiosity",
  //   slug: "curiosity_found",
  //   number: "20%",
  //   // icon: curiosityIcon,
  // },
  {
    title: "Call Alternate Channel",
    key: "call_alternate_channel_True",
    slug: "call_alternate_channel",
    number: "10%",
    // icon: paraphsingIcon,
  },

];
const processKhowledgeDetails = [
  // {
  //   title: "Information Accuracy",
  //   key: "information_accuracy",
  //   slug: "information_accuracy_found",
  //   number: "77%",
  //   // icon: informationaccuracyIcon,
  // },
  {
    title: "Critical Miss",
    key: "critical_miss",
    slug: "critical_miss",
    number: "10.12%",
    // icon: criticalIcon,
  },
  {
    title: "Non-critical Miss",
    key: "non_critical_miss",
    slug: "non_critical_miss",
    number: "35.45%",
    // icon: noncriticalIcon,
  },
  // {
  //   title: "Tagging",
  //   key: "tagging",
  //   slug: "tagging_found",
  //   number: "20%",
  //   // icon: taggingIcon,
  // },
  // {
  //   title: "Troubleshooting",
  //   key: "troubleshooting",
  //   slug: "troubleshooting_found",
  //   number: "33%",
  //   // icon: troublshootingIcon,
  // },
];

const communicationSkillDetail = [
  {
    title: "Rate of Speech",
    key: "rate_of_speech",
    slug: "rate_of_speech_found",
    number: "10%",
    // icon: rateofspeechIcon,
  },
  // {
  //   title: "Voice Volume",
  //   key: "voice_volume",
  //   slug: "voice_volume_found",
  //   number: "20.45%",
  //   // icon: voicevolumeIcon,
  // },
  {
    title: "responsiveness",
    key: "responsiveness",
    slug: "responsiveness_found",
    number: "15%",
    // icon: responsivenessIcon,
  },
  {
    title: "Clarity",
    key: "clarity",
    slug: "clarity_found",
    number: "56%",
    // icon: clarityIcon,
  },
];

const talktimeMetricDetail = [
    // {
    //   title: "Dead Air",
    //   key: "dead_air",
    //   slug: "dead_air_found",
    //   number: "48%",
    //   // icon: deadairIcon,
    // },
  {
    title: "Overtalk Incidents",
    key: "overtalk_incidents",
    slug: "overtalk_incidents_found",
    number: "25%",
    // icon: overtalkincidentsIcon,
  },
  {
    title: "Silent Incidents",
    key: "silent_incidents",
    slug: "silent_incidents_found",
    number: "49%",
    // icon: silentIncidentsIcon,
  },
];

const callSentiment = [
  {
    title: "Call Start Sentiment",
    key: "call_start_sentiment",
    slug: "call_start_sentiment_found",
    number: "48%",
  },
  {
    title: "Call End Sentiment",
    key: "call_end_sentiment",
    slug: "call_end_sentiment_found",
    number: "25%",
  },
  {
    title: "Overall Call Sentiment",
    key: "overall_call_sentiment",
    slug: "overall_call_sentiment_found",
    number: "49%",
  },
];

const Agent = ({
  values,
  filterValues,
  isAgentDataFetching,
  selectedFeature,
  handleClick,
  setValue,
}) => {
  const getCardValue = (item) => {
    let selectedValue = null;
    let selectedKeys = [];
    Object.keys(values).forEach((key) => {
      if (key.includes(item.key)) {
        selectedKeys.push({ key: key, value: values[key] });
      }
    });
    // const isValue = filterValues.find((x) => x.name === item.slug)?.value || null;
    // if (isValue === "False") {
    //     selectedValue = selectedKeys.find((value) => value.key.includes('False'))?.value || 0
    // } else {
    //     selectedValue = selectedKeys.find((value) => value.key.includes('True'))?.value || 0
    // }
    selectedValue =
      selectedKeys.find((value) => value.key.includes("_"))?.value || 0;
      // console.log(selectedValue)
    return selectedValue;
  };

  const clearFeature = () => {
    setValue("selectedFeature", []);
  };

  const removeFeature = (feature) => {
    const index = selectedFeature.indexOf(feature);
    const remainingFeature = selectedFeature.filter((item, i) => i !== index);
    setValue("selectedFeature", remainingFeature);
  };
    const average = (list) => {
    const sum = list.reduce((a, b) => a + b, 0);
    const avg = sum / list.length || 0;
    // console.log(sum);
    // console.log(avg);
    return avg;
  };
  const sum = (list) => {
    const sum = list.reduce((a, b) => a + b, 0);
    // const avg = sum / list.length || 0;
    // console.log(sum);
    // console.log(avg);
    return sum;
  };

  return (
    <div
      className={`${
        !(selectedFeature && selectedFeature.length > 0)
          ? " pl-8 pr-8 pb-100"
          : "pl-32 pr-32"
      }`}
    >
      <div className=" d-flex filter-chip-list">
        {selectedFeature &&
          selectedFeature.map((item, index) => {
            return (
              <div key={index} className="selected-feature-card">
                <span className="fs-12 fw-500 filter-chip text-black">{item} &nbsp;
         
                <CloseIcon
                  fontSize="inherit"
                  className="ml-10 cursor-pointer"
                  onClick={() => removeFeature(item)}
                />
                </span>
              </div>
            );
          })}
        {selectedFeature && selectedFeature.length > 0 && (
          <div
            className="fs-12 text-blue d-flex align-item-center cursor-pointer pl-8"
            onClick={clearFeature}
          >
            Clear All
          </div>
        )}
      </div>
      {selectedFeature && selectedFeature.length > 0 && (
        <div className="gray-divider w-100 mt-8 ml-8" />
      )}
      <Box sx={{ flexGrow: 1,pt:2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3} lg={3} className="w-100">
            <Item className="enable-sample-content">
              <CustomCard
                title={"Total Calls"}
                number={parseFloat(values.total_calls).toFixed(0)}
                titleLargeIcon={callIcon}
                // titleLargeIcon={true}
                customClass=" cursor-pointer "
                customCardClass="br-4"
                isIconRequired={false}
                loading={isAgentDataFetching}
                hidePercentage 
                handleClick={handleClick}
              />
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3} className="w-100">
            <Item className="enable-sample-content">
              <CustomCard
                title={"CSAT"}
                number={parseFloat(values.csat_score).toFixed(2)}
                titleLargeIcon={csatIcon}
                // titleLargeIcon={true}
                customClass=" cursor-pointer "
                customCardClass="br-4"
                isIconRequired={false}
                loading={isAgentDataFetching}
                handleClick={handleClick}
              />
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3} className="w-100">
            <Item className="enable-sample-content">
              <CustomCard
                title={"CQ Score"}
                number={parseFloat(values.cq_score).toFixed(2)}
                titleLargeIcon={cqScoreIcon}
                // titleLargeIcon={true}
                customClass=" cursor-pointer "
                customCardClass="br-4"
                isIconRequired={false}
                loading={isAgentDataFetching}
                handleClick={handleClick}
              />
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3} className="w-100">
            <Item className="enable-sample-content">
              <CustomCard
                title={"Sampling Rate"}
                number={parseFloat(values.total_all_calls).toFixed(2) || 100}
                titleLargeIcon={rateSmallIcon}
                // titleLargeIcon={true}
                customClass=" cursor-pointer "
                customCardClass="br-4"
                isIconRequired={false}
                loading={isAgentDataFetching}
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
      {(selectedFeature.includes("Salutations") ||
        !(selectedFeature && selectedFeature.length > 0)) && (
        <div style={{ marginTop: "20px" }}>
          <div className="d-flex justify-content-between align-item-center mb-12">
            <div className="sub-title">
              {/* <Typography component="div">
                <Box sx={{ fontWeight: "medium", m: 1 }}></Box>{" "}
              </Typography>{" "} */}
              Salutations &nbsp;
              {
                <span>
                  (
                  {average(
                    salutationDetails.map((a) => parseInt(getCardValue(a)))
                  ).toFixed(2) || 0}
                  {"%"})
                </span>
              }
            </div>
          </div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {salutationDetails.map((item, index) => {
                return (
                  <Grid
                    key={index}
                    item
                    sm={6}
                    md={4}
                    lg={3}
                    xl={3}
                    className="w-100"
                  >
                    <Item className="enable-sample-content">
                      <CustomCard
                        title={item.title}
                        number={parseFloat(getCardValue(item)).toFixed(2)}
                        customClass="setting-card cursor-pointer"
                        isIconRequired
                        customClass={`custome-line` + index}
                        // titleLargeIcon={true}
                        color={getCqScoreColor(parseFloat(getCardValue(item)).toFixed(2))}
                        loading={isAgentDataFetching}
                        handleClick={handleClick}
                      />
                    </Item>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </div>
      )}
      {(selectedFeature.includes("Soft Skills") ||
        !(selectedFeature && selectedFeature.length > 0)) && (
        <div className="mt-20">
          <div className="d-flex justify-content-between align-item-center mb-12">
            <div className="sub-title">
              Soft Skills &nbsp;
              {
                <span>
                  (
                  {average(
                    softSkillDetails.map((a) => parseInt(getCardValue(a)))
                  ).toFixed(2) || 0}
                  {"%"})
                </span>
              }
            </div>
          </div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {softSkillDetails.map((item, index) => {
                return (
                  <Grid key={index} item sm={6} md={3} lg={3} className="w-100">
                    <Item className="enable-sample-content">
                      <CustomCard
                        title={item.title}
                        number={parseFloat(getCardValue(item)).toFixed(2)}
                        customClass="setting-card cursor-pointer"
                        loading={isAgentDataFetching}
                        handleClick={handleClick}
                        customClass={`custome-line` + index}
                        // titleLargeIcon={item.icon}
                        // titleLargeIcon={true}
                        isIconRequired
                      />
                    </Item>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </div>
      )}
        {(selectedFeature.includes("Call Closure") ||
        !(selectedFeature && selectedFeature.length > 0)) && (
        <div className="mt-20">
          <div className="d-flex justify-content-between align-item-center mb-12">
            <div className="sub-title">
              Call Closure &nbsp;
              {
                <span>
                  (
                  {average(
                    callClosure.map((a) => parseInt(getCardValue(a)))
                  ).toFixed(2) || 0}
                  {"%"})
                </span>
              }
            </div>
          </div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {callClosure.map((item, index) => {
                return (
                  <Grid key={index} item sm={6} md={3} lg={3} className="w-100">
                    <Item className="enable-sample-content">
                      <CustomCard
                        title={item.title}
                        number={parseFloat(getCardValue(item)).toFixed(2)}
                        customClass="setting-card cursor-pointer"
                        loading={isAgentDataFetching}
                        handleClick={handleClick}
                        customClass={`custome-line` + index}
                        // titleLargeIcon={item.icon}
                        // titleLargeIcon={true}
                        isIconRequired
                      />
                    </Item>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </div>
      )}
      {(selectedFeature.includes("Process Knowledge") ||
        !(selectedFeature && selectedFeature.length > 0)) && (
        <div className="mt-20">
          <div className="d-flex justify-content-between align-item-center mb-12">
            <div className="sub-title">
              Process Knowledge &nbsp;
              {
                <span>
                  (
                  {sum(
                    processKhowledgeDetails.map((a) =>
                      parseInt(getCardValue(a))
                    )
                  ).toFixed(2) || 0}
                  )
                </span>
              }
            </div>
          </div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {processKhowledgeDetails &&
                processKhowledgeDetails.map((item, index) => {
                  return (
                    <Grid
                      key={index}
                      item
                      sm={6}
                      md={4}
                      lg={3}
                      className="w-100"
                    >
                      <Item className="enable-sample-content">
                        <CustomCard
                          title={item.title}
                          number={parseFloat(getCardValue(item)).toFixed(0)}
                          // customClass="setting-card cursor-pointer"
                          loading={isAgentDataFetching}
                          handleClick={handleClick}
                            hidePercentage
                          customClass={`custome-line` + index}
                          isIconRequired
                          // titleLargeIcon={cqScoreIcon}
                          // titleLargeIcon={item.icon}
                          // titleLargeIcon={true}
                        />
                      </Item>
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
        </div>
      )}
      {(selectedFeature.includes("Communication Skills") ||
        !(selectedFeature && selectedFeature.length > 0)) && (
        <div className="mt-20">
          <div className="d-flex justify-content-between align-item-center mb-12">
            <div className="sub-title">
              Communication Skills &nbsp;
              {
                <span>
                  (
                  {average(
                    communicationSkillDetail.map((a) =>
                      parseInt(getCardValue(a))
                    )
                  ).toFixed(2) || 0}
                  {"%"})
                </span>
              }
            </div>
          </div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {communicationSkillDetail &&
                communicationSkillDetail.map((item, index) => {
                  return (
                    <Grid
                      key={index}
                      item
                      sm={6}
                      md={4}
                      lg={3}
                      className="w-100"
                    >
                      <Item className="enable-sample-content">
                        <CustomCard
                          title={item.title}
                          number={parseFloat(getCardValue(item)).toFixed(2)}
                          customClass="setting-card cursor-pointer"
                          loading={isAgentDataFetching}
                          handleClick={handleClick}
                          customClass={`custome-line` + index}
                          isIconRequired
                          // titleLargeIcon={csatIcon}
                          // titleLargeIcon={item.icon}
                          // titleLargeIcon={true}
                        />
                      </Item>
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
        </div>
      )}
      {(selectedFeature.includes("Talktime Metrics") ||
        !(selectedFeature && selectedFeature.length > 0)) && (
        <div className="mt-20">
          <div className="d-flex justify-content-between mb-12 align-item-center">
            <div className="sub-title">
              Talktime Metrics &nbsp;
              {
                <span>
                  (
                  {average(
                    talktimeMetricDetail.map((a) => parseInt(getCardValue(a)))
                  ).toFixed(2) || 0}
                  {"%"})
                </span>
              }
            </div>
          </div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {talktimeMetricDetail &&
                talktimeMetricDetail.map((item, index) => {
                  return (
                    <Grid
                      key={index}
                      item
                      sm={6}
                      md={3}
                      lg={3}
                      className="w-100"
                    >
                      <Item className="enable-sample-content">
                        <CustomCard
                          title={item.title}
                          number={parseFloat(getCardValue(item)).toFixed(2)}
                          customClass="setting-card cursor-pointer"
                          loading={isAgentDataFetching}
                          handleClick={handleClick}
                          customClass={`custome-line` + index}
                          isIconRequired
                          // titleLargeIcon={rateSmallIcon}
                          // titleLargeIcon={item.icon}
                          // titleLargeIcon={true}
                        />
                      </Item>
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
        </div>
      )}
      {(selectedFeature.includes("Talktime Metrics") ||
        !(selectedFeature && selectedFeature.length > 0)) && (
        <div className="mt-20">
          <div className="d-flex justify-content-between mb-12 align-item-center">
            <div className="sub-title">
              Sentiment Metrics &nbsp;
              {
                <span>
                  (
                  {average(
                    callSentiment.map((a) => parseInt(getCardValue(a)))
                  ).toFixed(2) || 0}
                  {"%"})
                </span>
              }
            </div>
          </div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {callSentiment &&
                callSentiment.map((item, index) => {
                  return (
                    <Grid
                      key={index}
                      item
                      sm={6}
                      md={3}
                      lg={3}
                      className="w-100"
                    >
                      <Item className="enable-sample-content">
                        <CustomCard
                          title={item.title}
                          number={parseFloat(getCardValue(item)).toFixed(2)}
                          customClass="setting-card cursor-pointer"
                          loading={isAgentDataFetching}
                          customClass={`custome-line` + index}
                          handleClick={handleClick}
                          isIconRequired
                          // titleLargeIcon={csatIcon}
                          // titleLargeIcon={true}
                        />
                      </Item>
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Agent;
