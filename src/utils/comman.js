import redRectangle from "../assest/icon/redRectangle.png";
import greenline from "../assest/icon/green.svg";
import yellowline from "../assest/icon/yellow.svg";
import redline from "../assest/icon/red.svg";
import successRectangle from "../assest/icon/successRectangle.svg";
import orangeRectangle from "../assest/icon/orangeRectangle.svg";
import Cookies from "js-cookie";
import appConfig from "../config";




export const getlineColor = (value, min, max) => {
  if (value >= min && value < 40) {
    return redline;
  } else if (value >= 40 && value < 65) {
    return yellowline;
  } else {
    return greenline;
  }
};


export const getRectangleColor = (value, min, max) => {
  if (value > min && value < 40) {
    return redRectangle;
  } else if (value >= 40 && value < 65) {
    return orangeRectangle;
  } else {
    return successRectangle;
  }
};

export const getGraphColor = (value, min) => {
  if (value > min && value < 50) {
    return "#DE3C3C";
  } else if (value >= 50 && value < 70) {
    return "#FAB143";
  } else if (value > 70) {
    return "#22E597";
  } else {
    return "#DE3C3C";
  }
};
export const getCqScoreColor = (value, min, max) => {
  if (value >= min && value < 50) {
    return "#DE3C3C !important";
  } else if (value >= 50 && value < 70) {
    return "#FAB143 !important";
  } else {
    return "#3BD999 !important";
  }
};

export const setHeader = () => {
    return {
        Authorization: `Bearer ${appConfig.token}`,
        "X-CSRFToken": Cookies.get("csrftoken") || "",
    }
}
