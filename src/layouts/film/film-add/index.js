// React import
import React from "react";

// react-router components
import { useLocation } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
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
import CusTextField from "components/CusTextField";
import CusSwitch from "components/CusSwitch";

function FilmEdit() {
  const filmService = new FilmService();
  const theMovieDBServer = new TheMovieDBServer();
  const [themoviedb, setThemoviedb] = React.useState();
  const [film, setFilm] = React.useState({
    id: null,
    slug: null,
    name: null,
    thumbnail: null,
    backdrop: null,
    banner_image: null,
    type: 1,
    genres: null,
    release_date: null,
    is_banner: 0,
    is_recent: 0,
    is_new: 0,
    is_popular: 0,
    path: null,
    themoviedb_id: null,
    description: null,
  });

  function convertToSlug(text) {
    return text
      .toLowerCase() // Chuyển tất cả thành chữ thường
      .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
      .replace(/[^a-z0-9-]/g, "") // Loại bỏ các ký tự không phải chữ cái, số hoặc dấu gạch ngang
      .replace(/-+/g, "-") // Loại bỏ các dấu gạch ngang trùng lặp
      .trim(); // Loại bỏ khoảng trắng ở đầu và cuối chuỗi (nếu có)
  }

  async function addNewFilm(body) {
    try {
      await filmService.addFilm(body);
      alert("Add Successful");
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  function handleCrawlData() {
    if (themoviedb === undefined) return;
    let genresArray;
    let genresString
    if (themoviedb.genres) {
      // Sử dụng phương thức map để trích xuất tất cả các giá trị name từ mảng data
      genresArray = themoviedb.genres.map((item) => item.name);
      // Sử dụng phương thức join để chuyển mảng names thành chuỗi, ngăn cách bởi dấu phẩy và khoảng trắng
      genresString = genresArray.join(", ");
      console.log(genresString);
    }

    setFilm({
      ...film,
      release_date: themoviedb.release_date,
      genres: genresString,
      thumbnail: "https://image.tmdb.org/t/p/original" + themoviedb.poster_path,
      backdrop: "https://image.tmdb.org/t/p/original" + themoviedb.backdrop_path,
      description: themoviedb.overview
    });
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mb={3}>
        <Card>
          <SoftBox p={3}>
            <SoftBox display="flex" alignItems="center" marginRight={1} marginBottom={1}>
              <SoftTypography
                marginRight={1}
                component="label"
                variant="caption"
                fontWeight="bold"
                width="100px"
              >
                Type:
              </SoftTypography>
              <Select
                value={film.type}
                onChange={(event) => {
                  const { value } = event.target;
                  setFilm((prev) => ({
                    ...prev,
                    type: value,
                  }));
                }}
              >
                <MenuItem value={1}>TV Show</MenuItem>
                <MenuItem value={2}>Movie</MenuItem>
              </Select>
              <SoftTypography marginLeft={1} component="label" variant="caption" fontWeight="bold">
                {film.type}
              </SoftTypography>
            </SoftBox>
            <CusTextField
              label="name"
              value={film.name}
              onChange={(event) => {
                const { value } = event.target;
                setFilm((prev) => ({
                  ...prev,
                  name: value,
                  slug: convertToSlug(value),
                }));
              }}
            />
            <CusTextField
              label="slug"
              value={film.slug}
              onChange={(event) => {
                const { value } = event.target;
                setFilm((prev) => ({
                  ...prev,
                  slug: value,
                }));
              }}
            />
            <CusTextField
              label="genres"
              value={film.genres}
              onChange={(event) => {
                const { value } = event.target;
                setFilm((prev) => ({
                  ...prev,
                  genres: value,
                }));
              }}
            />
            <CusTextField
              multiline
              label="description"
              value={film.description}
              onChange={(event) => {
                const { value } = event.target;
                setFilm((prev) => ({
                  ...prev,
                  description: value,
                }));
              }}
            />
            <SoftBox display="flex">
              <SoftBox>
                <CusSwitch
                  label="Banner"
                  value={film.is_banner || 1}
                  checked={film.is_banner || 0}
                  onChange={(event) => {
                    console.log(film.is_banner);
                    setFilm((prev) => ({
                      ...prev,
                      is_banner: film.is_banner === 1 ? 0 : 1,
                    }));
                  }}
                />
                <CusSwitch
                  label="Recent"
                  value={film.is_recent || 1}
                  checked={film.is_recent || 0}
                  onChange={(event) => {
                    console.log(film.is_recent);
                    setFilm((prev) => ({
                      ...prev,
                      is_recent: film.is_recent === 1 ? 0 : 1,
                    }));
                  }}
                />
              </SoftBox>
              <SoftBox>
                <CusSwitch
                  label="Popular"
                  value={film.is_popular || 1}
                  checked={film.is_popular || 0}
                  onChange={(event) => {
                    console.log(film.is_popular);
                    setFilm((prev) => ({
                      ...prev,
                      is_popular: film.is_popular === 1 ? 0 : 1,
                    }));
                  }}
                />
                <CusSwitch
                  label="New"
                  value={film.is_new || 1}
                  checked={film.is_new || 0}
                  onChange={(event) => {
                    console.log(film.is_new);
                    setFilm((prev) => ({
                      ...prev,
                      is_new: film.is_new === 1 ? 0 : 1,
                    }));
                  }}
                />
              </SoftBox>
            </SoftBox>
            <CusTextField
              label="Release Date"
              type="date"
              value={
                film.release_date != null && new Date(film.release_date).toISOString().split("T")[0]
              }
              onChange={(event) => {
                const { value } = event.target;
                setFilm((prev) => ({
                  ...prev,
                  release_date: value,
                }));
              }}
            />
            <SoftBox>
              <CusTextField
                label="thumbnail"
                value={film.thumbnail}
                onChange={(event) => {
                  const { value } = event.target;
                  setFilm((prev) => ({
                    ...prev,
                    thumbnail: value,
                  }));
                }}
              />
              {film.thumbnail != null && (
                <img
                  style={{ maxWidth: "200px", marginBottom: "8px" }}
                  src={film.thumbnail}
                  alt={"thumbnail"}
                ></img>
              )}
            </SoftBox>
            <SoftBox>
              <CusTextField
                label="backdrop"
                value={film.backdrop}
                onChange={(event) => {
                  const { value } = event.target;
                  setFilm((prev) => ({
                    ...prev,
                    backdrop: value,
                  }));
                }}
              />
              {film.backdrop != null && (
                <img
                  style={{ maxHeight: "200px", marginBottom: "8px" }}
                  src={film.backdrop}
                  alt={"backdrop"}
                ></img>
              )}
            </SoftBox>
            <SoftBox>
              <CusTextField
                label="banner_image"
                value={film.banner_image}
                onChange={(event) => {
                  const { value } = event.target;
                  setFilm((prev) => ({
                    ...prev,
                    banner_image: value,
                  }));
                }}
              />
              {film.banner_image != null && (
                <img
                  style={{ maxHeight: "200px", marginBottom: "8px" }}
                  src={film.banner_image}
                  alt={"banner_image"}
                ></img>
              )}
            </SoftBox>
            <CusTextField
              label="path"
              value={film.path}
              onChange={(event) => {
                const { value } = event.target;
                setFilm((prev) => ({
                  ...prev,
                  path: value,
                }));
              }}
            />
            <SoftBox display="flex">
              <CusTextField
                label="themoviedb_id"
                value={film.themoviedb_id}
                onChange={async (event) => {
                  const { value } = event.target;
                  setFilm((prev) => ({
                    ...prev,
                    themoviedb_id: value,
                  }));
                  try {
                    const resApi = await theMovieDBServer.getThemovieDB(
                      value,
                      film.type === 2 ? "movie" : "tv"
                    );
                    if (resApi.status == 200) {
                      setThemoviedb(resApi.data);
                    } else {
                      setThemoviedb(undefined);
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }}
              />
              {themoviedb != undefined ? (
                <SoftButton onClick={handleCrawlData}>Crawl themoviedb</SoftButton>
              ) : (
                <SoftBox></SoftBox>
              )}
            </SoftBox>
            <SoftBox width="100%" style={{ display: "flex", justifyContent: "flex-end" }}>
              <SoftButton
                onClick={() => {
                  addNewFilm(film);
                }}
              >
                Add
              </SoftButton>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <SoftTypography>Add Film</SoftTypography>
            {themoviedb != undefined ? (
              <TheMovieContent themoviedb={themoviedb} />
            ) : (
              <SoftBox></SoftBox>
            )}
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default FilmEdit;
