import React, { useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SoftButton from "components/SoftButton";

function CusTextField({ label, value, onChange, ...restProps }) {
  return (
    <SoftBox display="flex" alignItems="center" marginRight={1} marginBottom={1}>
      <SoftTypography marginRight={1} component="label" variant="caption" fontWeight="bold" width="100px">
        {label}:
      </SoftTypography>
      <SoftInput
        label="Name"
        value={value}
        onChange={(event) => {
          onChange(event);
        }}
        {...restProps}
      />
    </SoftBox>
  );
}

CusTextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};

export default CusTextField;
