// React import
import React from "react";

// react-router components
import { useLocation, useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { Divider, InputLabel, MenuItem, Select } from "@mui/material";
import Pagination from "@mui/material/Pagination";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import CusInput from "components/CusInput";
import SoftButton from "components/SoftButton";
import TheMovieContent from "layouts/film/components/TheMovieContent";
import SoundDialog from "layouts/film//components/SoundDialog";

// Soft UI Dashboard React examples
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Service API
import FilmService from "services/examples/film.service";
import TheMovieDBServer from "services/examples/themoviedb.service";
import CusSwitch from "components/CusSwitch";

function FilmEdit() {
  const filmService = new FilmService();
  const theMovieDBServer = new TheMovieDBServer();
  const [filmData, setFilmData] = React.useState();
  const [themoviedb, setThemoviedb] = React.useState();
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const navigate = useNavigate();

  React.useEffect(() => {
    getAPI(route[route.length - 1]);
  }, []);

  const getAPI = async (id) => {
    try {
      const res = await filmService.getById(id);
      if (res.status === 200) {
        setFilmData(res.data);
        const resApi = await theMovieDBServer.getThemovieDB(
          res.data.themoviedb_id,
          res.data.type === 2 ? "movie" : "tv"
        );
        if (resApi.status == 200) {
          setThemoviedb(resApi.data);
        } else {
          setThemoviedb(undefined);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onShowSoundDialog = () => {
    setIsOpenDialog(true);
  };

  const updateFilm = async (filmData) => {
    try {
      await filmService.updateFilm(filmData._id, filmData);
      getAPI(route[route.length - 1]);
      alert("Save Successful");
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const deleteFilm = async (body) => {
    if (body._id === null) return;
    const result = window.confirm("Delelte Film");
    if (result) {
      try {
        await filmService.deleteFilm(body._id);
        alert("Delete Successful");
        navigate("/film");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mb={3}>
        <Card>
          <SoftBox p={2}>
            {filmData != undefined ? (
              <SoftBox>
                <Typography variant="h4" color="secondary">
                  Tune Find Data
                </Typography>
                <Divider />
                <SoftBox display="flex">
                  <CusInput
                    label="Name"
                    value={filmData.name}
                    onChange={(event) => {
                      const { value } = event.target;
                      setFilmData((prev) => ({
                        ...prev,
                        name: value,
                      }));
                    }}
                  />
                  <CusInput
                    label="Slug"
                    value={filmData.slug}
                    onChange={(event) => {
                      const { value } = event.target;
                      setFilmData((prev) => ({
                        ...prev,
                        slug: value,
                      }));
                    }}
                  />
                  <SoftBox display="flex" alignItems="center" marginRight={1} marginBottom={1}>
                    <SoftTypography
                      marginRight={1}
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Type:
                    </SoftTypography>
                    <Select
                      value={filmData.type}
                      onChange={(event) => {
                        const { value } = event.target;
                        setFilmData((prev) => ({
                          ...prev,
                          type: value,
                        }));
                      }}
                    >
                      <MenuItem value={1}>TV Show</MenuItem>
                      <MenuItem value={2}>Movie</MenuItem>
                    </Select>
                    <SoftTypography
                      marginLeft={1}
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      {filmData.type}
                    </SoftTypography>
                  </SoftBox>
                </SoftBox>
                <CusInput
                    label="Genres"
                    value={filmData.genres}
                    onChange={(event) => {
                      const { value } = event.target;
                      setFilmData((prev) => ({
                        ...prev,
                        genres: value,
                      }));
                    }}
                  />
                <SoftBox maxWidth="100%" display="flex" flexDirection="column">
                  <CusInput
                    multiline
                    label="Thumbnail"
                    value={filmData.thumbnail}
                    onChange={(event) => {
                      const { value } = event.target;
                      setFilmData((prev) => ({
                        ...prev,
                        thumbnail: value,
                      }));
                    }}
                  />
                  <img
                    style={{ maxWidth: "200px", marginBottom: "8px" }}
                    src={filmData.thumbnail}
                    alt={"thumbnail"}
                  ></img>
                </SoftBox>
                <SoftBox>
                  <CusInput
                    multiline
                    label="Backdrop"
                    value={filmData.backdrop}
                    onChange={(event) => {
                      const { value } = event.target;
                      setFilmData((prev) => ({
                        ...prev,
                        backdrop: value,
                      }));
                    }}
                  />
                  <img
                    style={{ maxHeight: "200px" }}
                    src={filmData.backdrop}
                    alt={"backdrop"}
                  ></img>
                </SoftBox>
                <SoftBox>
                  <CusInput
                    multiline
                    label="Banner Image"
                    value={filmData.banner_image}
                    onChange={(event) => {
                      const { value } = event.target;
                      setFilmData((prev) => ({
                        ...prev,
                        banner_image: value,
                      }));
                    }}
                  />
                  <img
                    style={{ maxHeight: "200px" }}
                    src={filmData.banner_image}
                    alt={"banner_image"}
                  ></img>
                </SoftBox>
                <CusInput
                  multiline
                  label="Description"
                  value={filmData.description}
                  onChange={(event) => {
                    const { value } = event.target;
                    setFilmData((prev) => ({
                      ...prev,
                      description: value,
                    }));
                  }}
                />
                <SoftBox display="flex">
                  <SoftBox>
                    <CusSwitch
                      label="Banner"
                      value={filmData.is_banner || 1}
                      checked={filmData.is_banner || 0}
                      onChange={(event) => {
                        console.log(filmData.is_banner);
                        setFilmData((prev) => ({
                          ...prev,
                          is_banner: filmData.is_banner === 1 ? 0 : 1,
                        }));
                      }}
                    />
                    <CusSwitch
                      label="Recent"
                      value={filmData.is_recent || 1}
                      checked={filmData.is_recent || 0}
                      onChange={(event) => {
                        console.log(filmData.is_recent);
                        setFilmData((prev) => ({
                          ...prev,
                          is_recent: filmData.is_recent === 1 ? 0 : 1,
                        }));
                      }}
                    />
                  </SoftBox>
                  <SoftBox>
                    <CusSwitch
                      color="success"
                      label="Popular"
                      value={filmData.is_popular || 1}
                      checked={filmData.is_popular || 0}
                      onChange={(event) => {
                        console.log(filmData.is_popular);
                        setFilmData((prev) => ({
                          ...prev,
                          is_popular: filmData.is_popular === 1 ? 0 : 1,
                        }));
                      }}
                    />
                    <CusSwitch
                      color="success"
                      label="New"
                      value={filmData.is_new || 1}
                      checked={filmData.is_new || 0}
                      onChange={(event) => {
                        console.log(filmData.is_new);
                        setFilmData((prev) => ({
                          ...prev,
                          is_new: filmData.is_new === 1 ? 0 : 1,
                        }));
                      }}
                    />
                  </SoftBox>
                </SoftBox>
                <CusInput
                  label="Release Date"
                  type="date"
                  value={filmData.release_date != null && new Date(filmData.release_date).toISOString().split("T")[0]}
                  onChange={(event) => {
                    const { value } = event.target;
                    setFilmData((prev) => ({
                      ...prev,
                      release_date: value,
                    }));
                  }}
                />
                <CusInput
                  multiline
                  label="Themoviedb_id"
                  value={filmData.themoviedb_id}
                  onChange={(event) => {
                    const { value } = event.target;
                    setFilmData((prev) => ({
                      ...prev,
                      themoviedb_id: value,
                    }));
                  }}
                  onBlur={async (event) => {
                    const { value } = event.target;
                    const resApi = await theMovieDBServer.getThemovieDB(
                      value,
                      filmData.type === 2 ? "movie" : "tv"
                    );
                    if (resApi.status == 200) {
                      setThemoviedb(resApi.data);
                    } else {
                      setThemoviedb(undefined);
                    }
                  }}
                />
                <SoftButton
                  onClick={() => {
                    onShowSoundDialog();
                  }}
                >
                  Sound Track
                </SoftButton>
                <SoftButton
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    updateFilm(filmData);
                  }}
                >
                  Save
                </SoftButton>
                <SoftButton
                  style={{ marginLeft: "10px" }}
                  variant="outlined"
                  color="error"
                  onClick={async () => {
                    await deleteFilm(filmData);
                  }}
                >
                  Delete
                </SoftButton>
              </SoftBox>
            ) : (
              <SoftBox></SoftBox>
            )}
            <Divider />
            {themoviedb != undefined ? (
              <TheMovieContent themoviedb={themoviedb} />
            ) : (
              <SoftBox></SoftBox>
            )}
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
      {filmData != undefined && (
        <SoundDialog
          reLoad={() => getAPI(route[route.length - 1])}
          film={filmData}
          isOpen={isOpenDialog}
          onChange={(value) => {
            setIsOpenDialog(value);
          }}
        />
      )}
    </DashboardLayout>
  );
}

export default FilmEdit;
