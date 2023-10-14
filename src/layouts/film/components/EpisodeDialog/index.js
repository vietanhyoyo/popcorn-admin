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
import EpisodeService from "services/examples/episode.service";

export default function EpisodeDialog({ filmProp, reLoad, season, isOpen, onChange }) {
  const newData = {
    _id: null,
    id: null,
    name: null,
    slug: null,
    description: null,
    release_date: null,
    season_id: season.id,
    code: null,
  };
  const episodeService = new EpisodeService();
  const soundService = new SoundService();
  const filmService = new FilmService();
  const seasonService = new SeasonService();
  const [open, setOpen] = React.useState(false);
  const [episodes, setEpisodes] = React.useState([]);
  const [selectSeason, setSelectSeason] = React.useState(-1);
  const [episode, setEpisode] = React.useState(newData);

  React.useEffect(() => {
    setOpen(isOpen);
  
    if (season != null) {
      setEpisode((prev) => ({
        ...prev,
        season_id: season.id,
      }));
    }
    getEpisodeList(filmProp, season);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    onChange(false);
    isOpen = false;
  };

  // Gọi Api lấy danh sách episode
  const getEpisodeList = async (film, season) => {
    try {
      const res = await filmService.getEpisodes(film.slug, season.slug);
      console.log(res);
      setEpisodes(res.data);
      return res.data;
    } catch (error) {
      setEpisodes([]);
      console.log("error");
      console.log(error);
      return [];
    }
  };

  async function saveEpisode(body) {
    try {
      if (episode._id === null) {
        await episodeService.addEpisode(body);
        getEpisodeList(filmProp, season);
        reLoad();
        alert("Add Successful");
      } else {
        await episodeService.updateEpisode(body._id, body);
        alert("Successful");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  const deleteEpisode = async (body) => {
    if (body._id === null) return;
    const result = confirm("Delelte Episode");
    if (result) {
      try {
        await episodeService.deleteEpisode(body._id);
        alert("Delete Successful");
        getEpisodeList(filmProp, season);
        reLoad();
      } catch (error) {
        console.log(error);
      }
    }
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
          <SoftBox display="flex">
            <SoftBox>
              {episodes.length != 0 &&
                episodes.map((ele, index) => {
                  return (
                    <SoftBox key={index} width="200px" mb={1}>
                      <SoftButton
                        onClick={() => {
                          setEpisode(ele);
                        }}
                        fullWidth={true}
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
              <SoftBox width="200px">
                <SoftButton
                  onClick={() => {
                    setEpisode(newData);
                  }}
                  fullWidth={true}
                >
                  <SoftBox>
                    <SoftTypography variant="caption">add new episode</SoftTypography>
                  </SoftBox>
                </SoftButton>
              </SoftBox>
            </SoftBox>
            <SoftBox ml={3}>
              <CusTextField
                disabled={true}
                label="season_id"
                value={episode.season_id ?? ""}
                onChange={(event) => {
                  const { value } = event.target;
                  setEpisode((prev) => ({
                    ...prev,
                    season_id: value,
                  }));
                }}
              />
              <CusTextField
                label="name"
                value={episode.name ?? ""}
                onChange={(event) => {
                  const { value } = event.target;
                  setEpisode((prev) => ({
                    ...prev,
                    name: value,
                    slug: convertToSlug(value),
                  }));
                }}
              />
              <CusTextField
                label="slug"
                value={episode.slug ?? ""}
                onChange={(event) => {
                  const { value } = event.target;
                  setEpisode((prev) => ({
                    ...prev,
                    slug: value,
                  }));
                }}
              />
              <CusTextField
                multiline
                label="description"
                value={episode.description ?? ""}
                onChange={(event) => {
                  const { value } = event.target;
                  setEpisode((prev) => ({
                    ...prev,
                    description: value,
                  }));
                }}
              />
              <CusTextField
                label="release_date"
                type="date"
                value={new Date(episode.release_date).toISOString().split("T")[0]}
                onChange={(event) => {
                  const { value } = event.target;
                  setEpisode((prev) => ({
                    ...prev,
                    release_date: value,
                  }));
                }}
              />
              <SoftButton
                style={{ marginRight: "10px" }}
                onClick={() => {
                  saveEpisode(episode);
                }}
              >
                Save
              </SoftButton>
              <SoftButton
                variant="outlined"
                color="error"
                onClick={async () => {
                  await deleteEpisode(episode);
                }}
              >
                Delete
              </SoftButton>
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

EpisodeDialog.propTypes = {
  filmProp: PropTypes.object.isRequired,
  season: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  reLoad: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
