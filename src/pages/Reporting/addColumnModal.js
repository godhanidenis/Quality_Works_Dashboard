import React from "react";
import { Box, FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CustomModal from "../../components/common/CustomModal";
import Button from "@mui/material/Button";

const AddColumnModal = ({
  visible,
  handleClose,
  addColumnData,
  addColumnSelectedValues,
  setAddColumnSelectedValues,
  getReportingList,
  saveColumns,
}) => {
  let columnGroupList = addColumnData.reduce((r, a) => {
    r[a.categoryName] = [...(r[a.categoryName] || []), a];
    return r;
  }, {});

  const handleParentCheckBoxChange = (keyName, values) => {
    const findIndex = addColumnSelectedValues.findIndex(
      (a) => a.key === keyName
    );
    if (findIndex !== -1) {
      const updated = addColumnSelectedValues.filter((a) => a.key !== keyName);
      setAddColumnSelectedValues([...updated]);
    } else {
      const obj = { key: keyName, values: values.map((a) => a.slug) };
      setAddColumnSelectedValues([...addColumnSelectedValues, obj]);
    }
  };

  const handleChildCheckBoxChange = (key, value) => {
    const find = (addColumnSelectedValues || []).find((a) => a.key === key);
    if (find) {
      const isExist = find.values.includes(value);
      let map = [];
      if (isExist) {
        map = addColumnSelectedValues.map((a) => {
          if (a.key === key) {
            return {
              ...a,
              values: a.values.filter((a) => a !== value),
            };
          } else {
            return a;
          }
        });
      } else {
        map = addColumnSelectedValues.map((a) => {
          if (a.key === key) {
            return {
              ...a,
              values: [...a.values, value],
            };
          } else {
            return a;
          }
        });
      }
      setAddColumnSelectedValues(map);
    } else {
      const obj = { key: key, values: [value] };
      setAddColumnSelectedValues([...addColumnSelectedValues, obj]);
    }
  };

  const isChildChecked = (key, a) => {
    const find = (addColumnSelectedValues || []).find((a) => a.key === key);
    if (find) {
      return find.values?.includes(a.slug);
    }
    return false;
  };

  const isParentChecked = (columnGroupList, key) => {
    return columnGroupList[key].every((a) => {
      const find = (addColumnSelectedValues || []).find((a) => a.key === key);
      if (find) {
        return find.values?.includes(a.slug);
      }
      return false;
    });
  };

  return (
    <CustomModal
      visible={visible}
      handleClose={handleClose}
      customClass="reporting-modal"
    >
      <div className="add-column-header">
        <div className="fs-16 fw-700 text-black">Add Columns</div>
        <div>
        <Button
          onClick={() => {
            handleClose();
            getReportingList();
          }}
          style={{ backgroundColor: "#FFFFFF", color: "#333333" }}
          className="reporting-btn"
        >
          <span style={{ padding: "4px 8px", fontWeight:600 }}>Cancel</span>
        </Button>
        <Button
          onClick={saveColumns}
          style={{ backgroundColor: "#0070C0", color: "white" }}
          className="reporting-btn"
        >
          <span style={{ padding: "4px 8px",fontWeight:600 }}>Save </span>
        </Button>
        </div>
      </div>
      <div className="gray-divider" />
      <div className="add-column-body">
        {Object.keys(columnGroupList).map((key, i) => (
          <React.Fragment key={i}>
            <FormControlLabel
              label={key}
              control={
                <Checkbox
                  checked={isParentChecked(columnGroupList, key)}
                  indeterminate={false}
                  onChange={() =>
                    handleParentCheckBoxChange(key, columnGroupList[key])
                  }
                />
              }
            />
            <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
              {columnGroupList[key].map((a, index) => (
                <FormControlLabel
                  key={index}
                  label={a.subcategoryName}
                  checked={isChildChecked(key, a)}
                  control={
                    <Checkbox
                      onChange={() => handleChildCheckBoxChange(key, a.slug)}
                    />
                  }
                />
              ))}
            </Box>
          </React.Fragment>
        ))}
      </div>
    </CustomModal>
  );
};

export default AddColumnModal;
