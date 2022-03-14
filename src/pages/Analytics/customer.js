import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  styled,
  Table,
  TableBody,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
// import ReactWordcloud from "react-wordcloud";
import TableCell from "@mui/material/TableCell/TableCell";
import UpDown from "../../assest/icon/updown.png";
import Highcharts from "highcharts";
import wordCloud from "highcharts/modules/wordcloud.js";
import DatePicker from "../../components/common/datePicker";
import CustomCard from "../../components/common/CustomCard";
import HighchartsReact from "highcharts-react-official";

wordCloud(Highcharts);

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  background: "#ffffff",
  borderRadius: "10px",
  boxShadow: "none",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F7F7F7",
    color: "#262626",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#262626",
    borderBottom: "unset",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#F5F8FA",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const createData = (name, score) => {
  return { name, score };
};

// eslint-disable-next-line no-unused-vars
const customerDetail = [
  createData("Account", "0.2%"),
  createData("Deactivation", "11.4%"),
  createData("Recharge", "10.2%"),
  createData("Failed", "15.00%"),
  createData("Transaction", "16.8%"),
];

const words = [
  {
    text: "Account Opening",
    value: 64,
  },
  {
    text: "Processing",
    value: 11,
  },
  {
    text: "Net Banking",
    value: 16,
  },
  {
    text: "Manikonda",
    value: 17,
  },
  {
    text: "Account",
    value: 64,
  },
  {
    text: "Banking",
    value: 11,
  },
  {
    text: "Money",
    value: 16,
  },
  {
    text: "UPI",
    value: 17,
  },
  {
    text: "Transaction Fail",
    value: 64,
  },
  {
    text: "Call",
    value: 11,
  },
  {
    text: "Server Down",
    value: 16,
  },
  {
    text: "Online Banking",
    value: 17,
  },
  {
    text: "Fail",
    value: 64,
  },
  {
    text: "Gpay",
    value: 11,
  },
  {
    text: "Paytm",
    value: 16,
  },
  {
    text: "UPI ID",
    value: 17,
  },
  {
    text: "UPI",
    value: 64,
  },
  {
    text: "9am-3pm",
    value: 11,
  },
  {
    text: "Paytm",
    value: 16,
  },
  {
    text: "call",
    value: 17,
  },
  {
    text: "SBI",
    value: 64,
  },
  {
    text: "PhonePe",
    value: 11,
  },
  {
    text: "Money",
    value: 16,
  },
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

const options = {
  colors: ["#2294E6", "#0070C0", "#CEE3F2", "#2D9CDB", "#CEE3F2"],
  enableTooltip: false,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [5, 50],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 0,
  rotations: 3,
  rotationAngles: [0, 0],
  // scale: "sqrt",
  // spiral: "archimedean",
  // transitionDuration: 1000
};
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



const Customer = ({ customerDetails,selectedFeature,isCustomerDataFetching,handleClick }) => {
  console.log("customerdata", customerDetails)
  // const [keywords, setKeywords] = React.useState([]);
   const getCardValue = (item) => {
    let selectedValue = null;
    let selectedKeys = [];
    Object.keys(customerDetails).forEach((key) => {
      if (key.includes(item.key)) {
        selectedKeys.push({ key: key, value: customerDetails[key] });
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
  const keyword =[]
  customerDetails?.keywords?.map((item)=>{
      item = {name:item.text,weight:item.value}
      keyword.push(item);
      // setKeywords(keyword)
  })
  // console.log(keywords)
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

   const option =  {
        chart: {
      height: 250,
    },
  accessibility: {
    screenReaderSection: {
      beforeChartFormat: '<h5>{chartTitle}</h5>' +
        '<div>{chartSubtitle}</div>' +
        '<div>{chartLongdesc}</div>' +
        '<div>{viewTableButton}</div>'
    }
  },
   credits: {
      enabled: false,
    },
  series: [{
    type: 'wordcloud',
    data:keyword,
    name: 'value'
  }],
  title: {
    text: 'Keywords'
  }
}
  // console.log(keywords)
  return (
    <div className="pl-16 pb-80">
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
                          loading={isCustomerDataFetching}
                          handleClick={handleClick}
                          customClass={`custome-line` + index}
                          isIconRequired
                          // titleLargeIcon={csatIcon}
                          titleLargeIcon={item.icon}
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
                          loading={isCustomerDataFetching}
                          handleClick={handleClick}
                          // customClass={`custome-line` + index}
                          isIconRequired
                          // titleLargeIcon={rateSmallIcon}
                          titleLargeIcon={item.icon}
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
                          loading={isCustomerDataFetching}
s                          handleClick={handleClick}
                          isIconRequired
                          // titleLargeIcon={csatIcon}
                        />
                      </Item>
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
        </div>
      )}
      <Box sx={{ flexGrow: 1  }} className="mt-40">
        <Grid container spacing={2}>
          <Grid item sm={9} className="w-100">
            <Item>
              <Card className="customer-card">
                <CardContent>
                  {/* <div className="fs-16 fw-500 text-black keyword">
                    Keywords
                  </div>
                  <div className="gray-divider" />
                  <div className=""> */}
                    {/* <div style={{ maxHeight: 278 }}> */}
                       <HighchartsReact highcharts={Highcharts}  options={option} />
                      {/* <KeyWordChart words={keywords} /> */}
                    {/* </div> */}
                  {/* </div> */}
                </CardContent>
              </Card>
            </Item>
          </Grid>
          <Grid item sm={3} className="w-100">
            <Item>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow className="custom-topic-header">
                      <StyledTableCell align="left">Topics</StyledTableCell>
                      <StyledTableCell align="left" />
                    </TableRow>
                    <TableRow>
                      <StyledTableCell align="left">
                        Topic Name <img src={UpDown} alt="agent" />
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Score <img src={UpDown} alt="agent" />
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell align="left">
                        fare refund
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {customerDetails?.topics?.["fare refund"]}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell align="left">
                        flight booking
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {customerDetails?.topics?.["flight booking"]}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell align="left">
                        flight change
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {customerDetails?.topics?.["flight change"]}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell align="left">
                        vegetarian food
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {customerDetails?.topics?.["vegetarian food"]}
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};



export default Customer;
