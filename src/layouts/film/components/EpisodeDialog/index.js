import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import CusInput from "components/CusInput";
import CusTextField from "components/CusTextField";
import SoftButton from "components/SoftButton";
import FilmService from "services/examples/film.service";
import SoundService from "services/examples/sound.service";
import SeasonService from "services/examples/season.service";

export default function EpisodeDialog({ filmProp, isOpen, onChange }) {
  
  const soundService = new SoundService();
  const filmService = new FilmService();
  const seasonService = new SeasonService();
  const [open, setOpen] = React.useState(false);
  const [selectSeason, setSelectSeason] = React.useState(-1);

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    onChange(false);
    isOpen = false;
  };

  function convertToSlug(text) {
    return text
      .toLowerCase() // Chuyển tất cả thành chữ thường
      .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
      .replace(/[^a-z0-9-]/g, "") // Loại bỏ các ký tự không phải chữ cái, số hoặc dấu gạch ngang
      .replace(/-+/g, "-") // Loại bỏ các dấu gạch ngang trùng lặp
      .trim(); // Loại bỏ khoảng trắng ở đầu và cuối chuỗi (nếu có)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="1200px">
        <DialogTitle>Episode</DialogTitle>
        <DialogContent>
          <SoftBox display="flex">Episode</SoftBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

EpisodeDialog.propTypes = {
  filmProp: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
