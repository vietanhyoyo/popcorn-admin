import React from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";

function FilmContent({ title, content, ...restProps }) {
  return (
    <SoftBox display="flex" alignItems="center" {...restProps}>
      <SoftTypography variant="caption" fontWeight="bold">
        {title}:
      </SoftTypography>
      <SoftTypography variant="caption" marginLeft={1}>
        {content != undefined ? (typeof myVar === "string" ? content : content.toString()) : ""}
      </SoftTypography>
    </SoftBox>
  );
}

FilmContent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
};

export default FilmContent;
