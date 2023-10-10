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
    type: 1,
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
      alert("Successful");
      console.log("Successful");
    } catch (error) {
      alert(error);
      console.log(error);
    }
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
