import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FilmService from "services/examples/film.service";
import SoundService from "services/examples/sound.service";
import PropTypes from "prop-types";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import CusInput from "components/CusInput";
import { MenuItem, Select } from "@mui/material";

export default function SoundDialog({ film, isOpen, onChange }) {
  // Define service
  const filmService = new FilmService();
  const soundService = new SoundService();
  // Define state
  const [open, setOpen] = React.useState(false);
  const [sounds, setSounds] = React.useState([]);
  const [selectSound, setSelectSound] = React.useState();
  const [seasons, setSeasons] = React.useState([]);
  const [selectSeason, setSelectSeason] = React.useState(0);
  const [episodes, setEpisodes] = React.useState([]);
  const [selectEpisode, setSelectEpisode] = React.useState(0);

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

  // Gọi api lấy dữ liệu season
  const getSeasonList = async (film) => {
    try {
      const res = await filmService.getSeasons(film.slug);
      setSeasons(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  // Gọi Api lấy danh sách episode
  const getEpisodeList = async (film, season) => {
    try {
      const res = await filmService.getEpisodes(film.slug, season.slug);
      setEpisodes(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  // Sự kiện thay đổi season
  const changeSeason = async (film, selectSeason) => {
    const episodeList = await getEpisodeList(film, selectSeason);
    if (episodeList != []) {
      setSelectEpisode(0);
      // Get api soundtrack
      const res = await filmService.getSoundTrack(film.slug, episodeList[0].slug);
      setSounds(res.data);
    }
  };

  // Lấy dữ liệu đầu vào
  const getSoundAPI = async () => {
    if (film != undefined) {
      try {
        if (film.type === 2) {
          const res = await filmService.getSoundTrack(film.slug);
          setSounds(res.data);
        } else {
          const seasonList = await getSeasonList(film);
          if (seasonList != []) {
            setSelectSeason(0);
            await changeSeason(film, seasonList[0]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateSoundTrack = async (soundData) => {
    try {
      const res = await soundService.updateSound(soundData._id, soundData);
      console.log(res);
      getSoundAPI();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="1200px">
        <DialogTitle>Sound Track</DialogTitle>
        <DialogContent>
          <SoftBox display="flex">
            <SoftBox>
              <SoftBox>
                {seasons.length != 0 && (
                  <Select
                    value={selectSeason}
                    onChange={(event) => {
                      setSelectSeason(event.target.value);
                      changeSeason(film, selectSeason);
                    }}
                  >
                    {seasons.map((ele, index) => {
                      return (
                        <MenuItem key={index} value={index}>
                          {ele.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
                {episodes.length != 0 && (
                  <Select
                    value={selectEpisode}
                    onChange={async (event) => {
                      setSelectEpisode(event.target.value);
                      try {
                        // Get api soundtrack
                        const res = await filmService.getSoundTrack(
                          film.slug,
                          episodes[event.target.value].slug
                        );
                        if (res.data != []) setSounds(res.data);
                        else setSounds([]);
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    {episodes.map((ele, index) => {
                      return (
                        <MenuItem key={index} value={index}>
                          {ele.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              </SoftBox>
              {sounds.length != 0 &&
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
            <SoftBox ml={1}>
              {selectSound != undefined && (
                <SoftBox>
                  <SoftBox width="500px">
                    <CusInput
                      label="name"
                      value={selectSound.name ?? ""}
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
                      value={selectSound.slug ?? ""}
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
                      value={selectSound.itune_link ?? ""}
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
                      value={selectSound.youtube_link ?? ""}
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
                      value={selectSound.amazon_link ?? ""}
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
                      value={selectSound.apple_link ?? ""}
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
                      value={selectSound.spotify_link ?? ""}
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
                      value={selectSound.film_id ?? ""}
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
                      value={selectSound.episode_id ?? ""}
                      onChange={(event) => {
                        const { value } = event.target;
                        setSelectSound((prev) => ({
                          ...prev,
                          episode_id: value,
                        }));
                      }}
                    />
                  </SoftBox>
                  <SoftButton
                    variant="contained"
                    color="secondary"
                    onClick={async () => {
                      await updateSoundTrack(selectSound);
                    }}
                  >
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