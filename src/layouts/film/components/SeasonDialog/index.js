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

export default function SeasonDialog({ filmProp, seasonList, isOpen, onChange }) {
  const soundService = new SoundService();
  const filmService = new FilmService();
  const [open, setOpen] = React.useState(false);
  const [selectSeason, setSelectSeason] = React.useState(-1);
  const [season, setSeason] = React.useState({
    id: null,
    name: null,
    slug: null,
    release_date: null,
    film_id: filmProp.id,
  });

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    onChange(false);
    isOpen = false;
  };

  async function addSound(body) {
    try {
      //await soundService.addSound(body);
      alert("Successful");
      console.log("Successful");
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

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
        <DialogTitle>Season</DialogTitle>
        <DialogContent>
          <SoftBox display="flex">
            {seasonList.length != 0 &&
              seasonList.map((ele, index) => {
                return (
                  <SoftBox key={index} width="200px">
                    <SoftButton
                      onClick={() => {
                        setSeason(ele);
                      }}
                    >
                      <SoftBox>
                        <SoftTypography variant="caption">
                          -{index}--{ele.name}
                        </SoftTypography>
                      </SoftBox>
                    </SoftButton>
                  </SoftBox>
                );
              })}
          </SoftBox>
          <SoftBox>
            <CusTextField
              label="name"
              value={season.name ?? ""}
              onChange={(event) => {
                const { value } = event.target;
                setSeason((prev) => ({
                  ...prev,
                  name: value,
                }));
              }}
            />
            <CusTextField
              label="slug"
              value={season.slug ?? ""}
              onChange={(event) => {
                const { value } = event.target;
                setSeason((prev) => ({
                  ...prev,
                  slug: value,
                }));
              }}
            />
            <CusTextField
              disabled={true}
              label="film_id"
              value={season.film_id ?? ""}
              onChange={(event) => {}}
            />
            <SoftTypography>
                {season.release_date}
            </SoftTypography>
            <CusTextField
              label="release_date"
              type="date"
              value={new Date(season.release_date).toISOString().split('T')[0]}
              onChange={(event) => {
                const { value } = event.target;
                setSeason((prev) => ({
                  ...prev,
                  release_date: value,
                }));
              }}
            />
          </SoftBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

SeasonDialog.propTypes = {
  filmProp: PropTypes.object.isRequired,
  seasonList: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
