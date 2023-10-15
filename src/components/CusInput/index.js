import React, { useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function CusInput({ label, value, onChange, ...restProps }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <SoftBox display="flex" alignItems="center" marginRight={1} marginBottom={1}>
      <SoftTypography marginRight={1} component="label" variant="caption" fontWeight="bold">
        {label}:
      </SoftTypography>
      <SoftInput
        label="Name"
        value={value}
        disabled={!isEditing}
        onChange={(event) => {
          if (!isEditing) return;
          onChange(event);
        }}
        {...restProps} 
      />
      <IconButton variant="contained" onClick={handleToggleEditing} size="small">
        {isEditing ? <CheckCircleOutlineIcon color="primary" /> : <EditIcon />}
      </IconButton>
    </SoftBox>
  );
}

CusInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

export default CusInput;
