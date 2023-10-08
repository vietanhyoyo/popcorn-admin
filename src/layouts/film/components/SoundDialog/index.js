import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FilmService from "services/examples/film.service";
import PropTypes from "prop-types";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import CusInput from "components/CusInput";

export default function SoundDialog({ film, isOpen, onChange }) {
  const filmService = new FilmService();
  const [open, setOpen] = React.useState(false);
  const [sounds, setSounds] = React.useState([]);
  const [selectSound, setSelectSound] = React.useState();

  const handleClose = () => {
    setOpen(false);
    onChange(false);
    isOpen = false;
  };

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  React.useEffect(() => {
    getSoundAPI();
  }, []);

  const getSoundAPI = async () => {
    if (film != undefined) {
      try {
        if (film.type === 1) {
          const res = await filmService.getSoundTrack(film.slug);
          setSounds(res.data);
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="1200px">
        <DialogTitle>Sound Track</DialogTitle>
        <DialogContent>
          <SoftBox display="flex">
            <SoftBox>
              {sounds.length != [] &&
                sounds.map((ele, index) => {
                  return (
                    <SoftBox key={index} width="200px">
                      <SoftButton
                        onClick={() => {
                          setSelectSound(ele);
                        }}
                        fullWidth={true}
                      >
                        <SoftBox>
                          <SoftTypography variant="caption">
                            -{index}-{ele.name}
                          </SoftTypography>
                        </SoftBox>
                      </SoftButton>
                    </SoftBox>
                  );
                })}
            </SoftBox>
            <SoftBox>
              {selectSound != undefined && (
                <SoftBox>
                  <SoftBox width="500px">
                    <CusInput
                      label="name"
                      value={selectSound.name}
                      onChange={(event) => {
                        const { value } = event.target;
                        setSelectSound((prev) => ({
                          ...prev,
                          name: value,
                        }));
                      }}
                    />
                  </SoftBox>
                  <SoftBox width="500px">
                    <CusInput
                      label="slug"
                      value={selectSound.slug}
                      onChange={(event) => {
                        const { value } = event.target;
                        setSelectSound((prev) => ({
                          ...prev,
                          slug: value,
                        }));
                      }}
                    />
                  </SoftBox>
                  <SoftBox width="500px">
                    <CusInput
                      label="itune_link"
                      value={selectSound.itune_link}
                      onChange={(event) => {
                        const { value } = event.target;
                        setSelectSound((prev) => ({
                          ...prev,
                          itune_link: value,
                        }));
                      }}
                    />
                  </SoftBox>
                  <SoftBox width="500px">
                    <CusInput
                      label="youtube_link"
                      value={selectSound.youtube_link}
                      onChange={(event) => {
                        const { value } = event.target;
                        setSelectSound((prev) => ({
                          ...prev,
                          youtube_link: value,
                        }));
                      }}
                    />
                  </SoftBox>
                  <SoftBox width="500px">
                    <CusInput
                      label="amazon_link"
                      value={selectSound.amazon_link}
                      onChange={(event) => {
                        const { value } = event.target;
                        setSelectSound((prev) => ({
                          ...prev,
                          amazon_link: value,
                        }));
                      }}
                    />
                  </SoftBox>
                  <SoftBox width="500px">
                    <CusInput
                      label="apple_link"
                      value={selectSound.apple_link}
                      onChange={(event) => {
                        const { value } = event.target;
                        setSelectSound((prev) => ({
                          ...prev,
                          apple_link: value,
                        }));
                      }}
                    />
                  </SoftBox>
                  <SoftBox width="500px">
                    <CusInput
                      label="spotify_link"
                      value={selectSound.spotify_link}
                      onChange={(event) => {
                        const { value } = event.target;
                        setSelectSound((prev) => ({
                          ...prev,
                          spotify_link: value,
                        }));
                      }}
                    />
                  </SoftBox>
                  <SoftBox width="500px">
                    <CusInput
                      label="film_id"
                      value={selectSound.film_id}
                      onChange={(event) => {
                        const { value } = event.target;
                        setSelectSound((prev) => ({
                          ...prev,
                          film_id: value,
                        }));
                      }}
                    />
                  </SoftBox>
                  <SoftBox width="500px">
                    <CusInput
                      label="episode_id"
                      value={selectSound.episode_id}
                      onChange={(event) => {
                        const { value } = event.target;
                        setSelectSound((prev) => ({
                          ...prev,
                          episode_id: value,
                        }));
                      }}
                    />
                  </SoftBox>
                  <SoftButton variant="contained" color="secondary">
                    Save
                  </SoftButton>
                </SoftBox>
              )}
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

SoundDialog.propTypes = {
  film: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
