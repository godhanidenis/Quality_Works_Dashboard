import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Checkbox from "@mui/material/Checkbox";
import { ScoreDetail } from "../../CONST";
import { getRectangleColor } from "../../utils/comman";

const Item = styled(Paper)(({ theme }) => ({
  // ...theme.typography.body2,
  fontSize: "0.825rem"
}));

const Scores = ({ data, salutations, setCurrentTime }) => {
  const [isOpen, setOpen] = useState(false);
  const [scoreDetailsData, setScoreDetailsData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("");
  // console.log({ data, salutations, setCurrentTime })
  useEffect(() => {
    if (
      salutations &&
      salutations?.alignment &&
      salutations?.alignment[0] &&
      salutations?.alignment[0]?.start
    ) {
      const newData = ScoreDetail.map((item) => {
        return {
          ...item,
          startTime: salutations?.alignment[0]?.start,
          lableText: "call_opening",
          checked: false,
        };
      });
      setScoreDetailsData(newData);
    }
    setScoreDetailsData(data?.cq_score_count)
  }, [salutations, data]);

  const handleClick = (index) => {
    setOpen(!isOpen);
    setSelectedIndex(index);
  };


    const getCardValue = (item) => {
    let selectedValue = null;
    let selectedKeys = [];
    Object.keys(item).forEach((key) => {
      // console.log(key)
      if (key.includes("found")) {
        selectedValue=item[key]; 

      }
    });

    if(selectedValue==="False"){
      return "Not Adhered";
    }else{
       return "Adhered";
    }
  };

  // console.log(scoreDetailsData)

  const handleToggle = (e, index, startTime) => {
    if(startTime){
      console.log(startTime)
      setCurrentTime(startTime, true)
    }
    // const dataCopy = scoreDetailsData.slice();
    // dataCopy[index].checked = e.target.checked;
    // e.target.checked && setCurrentTime(startTime, true);
    // setScoreDetailsData(dataCopy);
  };

  return (
    <Grid item sm={12}>
      <Item
        style={{
          background: "#FFFFFF",
          borderRadius: "20px",
          boxShadow: "none",
        }}
      >
        <div className="">
          <Grid
            container
            className="d-flex justify-content-between fw-bold fs-14 text-black score-header"
            style={{
              background: "#f5ffa",
              boxSizing: "border-box",
              borderRadius: "20px",
              flexWrap: "nowrap",
            }}
          >
            <Grid item sm={12} sx={{ fontWeight: "600", pl: "8px" }}>
              CQ Scores
            </Grid>
            <Grid
              item
              sm={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                pr: "3px",
              }}
            >
              <img src={getRectangleColor(data.cq_score, 0, 100)} alt="score" />
              <span className="ml-8"> {data.cq_score}%</span>
            </Grid>
          </Grid>

          <div>
            <List
              component="nav"
              sx={{ height: "222px", pt: 0, overflow: "overlay" }}
            >
              {/* {console.log("salutations", scoreDetailsData)} */}

              {scoreDetailsData &&
                scoreDetailsData.map((item, index) => {
                  return (
                    <div key={index} className="score-bodys">
                      <Grid
                        container
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <ListItem
                          className="score-list"
                          sx={{ height: "32px !important" }}
                          button
                          onClick={() => handleClick(index)}
                        >
                          {isOpen && selectedIndex === index ? (
                            <ArrowDropDownIcon />
                          ) : (
                            <ArrowRightIcon />
                          )}
                          <Grid item sm={12}>
                            <ListItemText
                              inset
                              primary={item.category_name}
                              style={{
                                fontStyle: "normal",
                                paddingLeft: "4px",
                                whiteSpace: "nowrap",
                                width: "10vw",
                                overflow: "hidden",
                              }}
                              disableTypography={true}
                            />
                          </Grid>
                          <Grid
                            item
                            sm={12}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              pr: "4px",
                            }}
                          >
                            <div
                              className="box"
                              style={{ background: item.color }}
                            />
                            <span
                              className="ml-8"
                              style={{ fontWeight: "bold" }}
                            >
                              {item.weightage || "0"}{"%"}
                            </span>
                          </Grid>
                        </ListItem>
                      </Grid>
                      {selectedIndex === index && (
                        <Collapse in={isOpen} timeout="auto" unmountOnExit>

                          <List component="div" disablePadding>
                            {item &&
                              item.features.map((item, index) => {
                                const abc = `${item.doctype}_found`
                                // console.log(abc)
                                return (
                                  <ListItem button sx={{ p: "2px" }}>
                                    <ListItemText
                                      inset
                                      primary={item.doctype}
                                      style={{
                                        fontStyle: "normal",
                                        paddingLeft: "16px",
                                        whiteSpace: "nowrap",
                                        width: "1vw",
                                        overflow: "hidden",
                                      }}
                                      disableTypography={true}
                                    />
                                    <span className="pr-16" onClick={(e) =>
                                        // console.log(item)
                                        handleToggle(e, index, item?.alignment[0]?.start || null)}>
                                      {/* {item.call_opening_found} */}
                                       {getCardValue(item)}
                                    </span>



                                    {/* <Checkbox
                                      onChange={(e) =>
                                        // console.log(item)
                                        handleToggle(e, index, item)
                              
                                      }
                                      checked={item.checked}
                                    /> */}
                                  </ListItem>
                                );
                              })}

                          </List>
                        </Collapse>
                      )}
                    </div>
                  );
                })}
            </List>
          </div>
        </div>
      </Item>
    </Grid>
  );
};

Scores.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Scores;
