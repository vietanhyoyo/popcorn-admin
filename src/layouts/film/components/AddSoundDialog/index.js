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

export default function AddSoundDialog({ filmProp, episode_id, isOpen, onChange }) {
  const soundService = new SoundService();
  const filmService = new FilmService();
  const [open, setOpen] = React.useState(false);
  const [soundData, setSoundData] = React.useState({
    id: null,
    name: null,
    slug: null,
    episode_id: episode_id,
    description: null,
    artist: null,
    itune_link: null,
    amazon_link: null,
    apple_link: null,
    spotify_link: null,
    youtube_link: null,
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
      await soundService.addSound(body);
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
        <DialogTitle>Add Sound</DialogTitle>
        <DialogContent>
          <SoftBox display="flex">
            <SoftBox>Add</SoftBox>
            <SoftBox ml={3}>
              <SoftBox width="500px">
                <CusTextField
                  label="name"
                  value={soundData.name ?? ""}
                  onChange={(event) => {
                    const { value } = event.target;
                    setSoundData((prev) => ({
                      ...prev,
                      name: value,
                      slug: convertToSlug(value),
                    }));
                  }}
                />
              </SoftBox>
              <SoftBox width="500px">
                <CusTextField
                  label="slug"
                  value={soundData.slug ?? ""}
                  onChange={(event) => {
                    const { value } = event.target;
                    setSoundData((prev) => ({
                      ...prev,
                      slug: value,
                    }));
                  }}
                />
              </SoftBox>
              <SoftBox width="500px">
                <CusTextField
                disabled
                  label="episode_id"
                  value={soundData.episode_id ?? ""}
                  onChange={(event) => {
                    const { value } = event.target;
                    setSoundData((prev) => ({
                      ...prev,
                      episode_id: value,
                    }));
                  }}
                />
              </SoftBox>
              <SoftBox width="500px">
                <CusTextField
                  disabled={true}
                  label="film_id"
                  value={soundData.film_id ?? ""}
                  onChange={(event) => {
                    const { value } = event.target;
                    setSoundData((prev) => ({
                      ...prev,
                      film_id: value,
                    }));
                  }}
                />
              </SoftBox>
              <SoftBox width="500px">
                <CusTextField
                  label="artist"
                  value={soundData.artist ?? ""}
                  onChange={(event) => {
                    const { value } = event.target;
                    setSoundData((prev) => ({
                      ...prev,
                      artist: value,
                    }));
                  }}
                />
              </SoftBox>
              <SoftBox width="500px">
                <CusTextField
                  label="description"
                  value={soundData.description ?? ""}
                  onChange={(event) => {
                    const { value } = event.target;
                    setSoundData((prev) => ({
                      ...prev,
                      description: value,
                    }));
                  }}
                />
              </SoftBox>
              <SoftBox width="500px">
                <CusTextField
                  label="itune_link"
                  value={soundData.itune_link ?? ""}
                  onChange={(event) => {
                    const { value } = event.target;
                    setSoundData((prev) => ({
                      ...prev,
                      itune_link: value,
                    }));
                  }}
                />
              </SoftBox>
              <SoftBox width="500px">
                <CusTextField
                  label="amazon_link"
                  value={soundData.amazon_link ?? ""}
                  onChange={(event) => {
                    const { value } = event.target;
                    setSoundData((prev) => ({
                      ...prev,
                      amazon_link: value,
                    }));
                  }}
                />
              </SoftBox>
              <SoftBox width="500px">
                <CusTextField
                  label="apple_link"
                  value={soundData.apple_link ?? ""}
                  onChange={(event) => {
                    const { value } = event.target;
                    setSoundData((prev) => ({
                      ...prev,
                      apple_link: value,
                    }));
                  }}
                />
              </SoftBox>
              <SoftBox width="500px">
                <CusTextField
                  label="spotify_link"
                  value={soundData.spotify_link ?? ""}
                  onChange={(event) => {
                    const { value } = event.target;
                    setSoundData((prev) => ({
                      ...prev,
                      spotify_link: value,
                    }));
                  }}
                />
              </SoftBox>
              <SoftBox width="500px">
                <CusTextField
                  label="youtube_link"
                  value={soundData.youtube_link ?? ""}
                  onChange={(event) => {
                    const { value } = event.target;
                    setSoundData((prev) => ({
                      ...prev,
                      youtube_link: value,
                    }));
                  }}
                />
              </SoftBox>
              <SoftBox>
                <SoftButton
                  onClick={() => {
                    addSound(soundData);
                  }}
                >
                  Save Sound
                </SoftButton>
              </SoftBox>
            </SoftBox>
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

AddSoundDialog.propTypes = {
  filmProp: PropTypes.object.isRequired,
  episode_id: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
