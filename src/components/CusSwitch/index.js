import React from "react";
import Switch from "@mui/material/Switch";
import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

const CusSwitch = ({ label, ...props }) => {
  return (
    <SoftBox display="flex" alignItems="center" mr={3}>
      <SoftTypography variant="caption" fontWeight="bold" width="100px">
        {label}:
      </SoftTypography>{" "}
      <Switch {...props}/>
    </SoftBox>
  );
};

CusSwitch.propTypes = {
  label: PropTypes.string.isRequired,
};

export default CusSwitch;
