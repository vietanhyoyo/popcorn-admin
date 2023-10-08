// import * as React from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import PropTypes from "prop-types";

// // react-router components
// import { useLocation } from "react-router-dom";

// // @mui material components
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
// import { Divider, InputLabel, MenuItem, Select } from "@mui/material";
// import Pagination from "@mui/material/Pagination";

// // Soft UI Dashboard React components
// import SoftBox from "components/SoftBox";
// import SoftInput from "components/SoftInput";
// import SoftTypography from "components/SoftTypography";
// import CusInput from "components/CusInput";

// // Soft UI Dashboard React examples
// import Footer from "examples/Footer";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// // Page Componet
// import FilmContent from "../components/FilmContent";

// // Service API
// import FilmService from "services/examples/film.service";
// import TheMovieDBServer from "services/examples/themoviedb.service";

// export default function EditFilmDialog({ id, isOpen }) {
//   const [open, setOpen] = React.useState(open);
//   const filmService = new FilmService();
//   const theMovieDBServer = new TheMovieDBServer();
//   const [filmData, setFilmData] = React.useState();
//   const [themoviedb, setThemoviedb] = React.useState();

//   React.useEffect(() => {
//     getAPI(id);
//   }, []);

//   const getAPI = async (id) => {
//     try {
//       const res = await filmService.getById(id);
//       if (res.status === 200) {
//         setFilmData(res.data);
//         const resApi = await theMovieDBServer.getThemovieDB(
//           res.data.themoviedb_id,
//           res.data.type === 1 ? "movie" : "tv"
//         );
//         if (resApi.status == 200) {
//           setThemoviedb(resApi.data);
//           console.log(resApi.data);
//         }
//       }
//       console.log(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   React.useEffect(() => {
//     setOpen(isOpen);
//   }, [isOpen]);

//   return (
//     <div>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open form dialog
//       </Button>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Subscribe</DialogTitle>
//         <SoftBox p={2}>
//             {filmData != undefined ? (
//               <SoftBox>
//                 <Typography variant="h4" color="secondary">
//                   Tune Find Data
//                 </Typography>
//                 <Divider />
//                 <SoftBox display="flex">
//                   <CusInput
//                     label="Name"
//                     value={filmData.name}
//                     onChange={(event) => {
//                       const { value } = event.target;
//                       setFilmData((prev) => ({
//                         ...prev,
//                         name: value,
//                       }));
//                     }}
//                   />
//                   <CusInput
//                     label="Slug"
//                     value={filmData.slug}
//                     onChange={(event) => {
//                       const { value } = event.target;
//                       setFilmData((prev) => ({
//                         ...prev,
//                         slug: value,
//                       }));
//                     }}
//                   />
//                   <SoftBox display="flex" alignItems="center" marginRight={1} marginBottom={1}>
//                     <SoftTypography
//                       marginRight={1}
//                       component="label"
//                       variant="caption"
//                       fontWeight="bold"
//                     >
//                       Type:
//                     </SoftTypography>
//                     <Select
//                       value={filmData.type}
//                       onChange={(event) => {
//                         const { value } = event.target;
//                         setFilmData((prev) => ({
//                           ...prev,
//                           type: value,
//                         }));
//                       }}
//                     >
//                       <MenuItem value={1}>Movie</MenuItem>
//                       <MenuItem value={2}>TV Show</MenuItem>
//                     </Select>
//                     <SoftTypography
//                       marginLeft={1}
//                       component="label"
//                       variant="caption"
//                       fontWeight="bold"
//                     >
//                       {filmData.type}
//                     </SoftTypography>
//                   </SoftBox>
//                 </SoftBox>
//                 <SoftBox maxWidth="100%" display="flex" flexDirection="column">
//                   <CusInput
//                     multiline
//                     label="Thumbnail"
//                     value={filmData.thumbnail}
//                     onChange={(event) => {
//                       const { value } = event.target;
//                       setFilmData((prev) => ({
//                         ...prev,
//                         thumbnail: value,
//                       }));
//                     }}
//                   />
//                   <img
//                     style={{ maxWidth: "200px" }}
//                     src={filmData.thumbnail}
//                     alt={"thumbnail"}
//                   ></img>
//                 </SoftBox>
//                 <SoftBox>
//                   <CusInput
//                     multiline
//                     label="Backdrop"
//                     value={filmData.backdrop}
//                     onChange={(event) => {
//                       const { value } = event.target;
//                       setFilmData((prev) => ({
//                         ...prev,
//                         backdrop: value,
//                       }));
//                     }}
//                   />
//                   <img
//                     style={{ maxHeight: "200px" }}
//                     src={filmData.backdrop}
//                     alt={"thumbnail"}
//                   ></img>
//                 </SoftBox>
//                 <CusInput
//                   multiline
//                   label="Description"
//                   value={filmData.description}
//                   onChange={(event) => {
//                     const { value } = event.target;
//                     setFilmData((prev) => ({
//                       ...prev,
//                       description: value,
//                     }));
//                   }}
//                 />
//                 <CusInput
//                   multiline
//                   label="Themoviedb_id"
//                   value={filmData.themoviedb_id}
//                   onChange={(event) => {
//                     const { value } = event.target;
//                     setFilmData((prev) => ({
//                       ...prev,
//                       themoviedb_id: value,
//                     }));
//                   }}
//                 />
//               </SoftBox>
//             ) : (
//               <SoftBox></SoftBox>
//             )}
//             <Divider />
//             {themoviedb != undefined ? (
//               <SoftBox>
//                 <Typography variant="h4" color="secondary">
//                   The Movie DB
//                 </Typography>
//                 <Divider />
//                 <SoftBox>
//                 <FilmContent title="id" content={themoviedb.id} />
//                 <FilmContent title="imdb_id" content={themoviedb.imdb_id} />
//                   <FilmContent title="title" content={themoviedb.title} />
//                   <FilmContent title="original_title" content={themoviedb.original_title} />
//                   <FilmContent title="tagline" content={themoviedb.tagline} />
//                   <FilmContent title="overview" content={themoviedb.overview} />
//                   <FilmContent title="release_date Date" content={themoviedb.release_date} />
//                   <FilmContent title="budget" content={themoviedb.budget} />
//                   <FilmContent title="homepage" content={themoviedb.homepage} />
//                   <FilmContent title="popularity" content={themoviedb.popularity} />
//                   <FilmContent title="vote_average" content={themoviedb.vote_average} />
//                   <FilmContent title="vote_count" content={themoviedb.vote_count} />
//                   <FilmContent title="adult" content={themoviedb.adult ? "true" : "false"} />
//                   <FilmContent title="genres" content={JSON.stringify(themoviedb.genres, null, 2)} />
//                   <FilmContent title="production_countries" content={JSON.stringify(themoviedb.production_countries, null, 2)} />
//                   <FilmContent title="production_companies" content={JSON.stringify(themoviedb.production_companies, null, 2)} />
//                   <FilmContent title="spoken_languages" content={JSON.stringify(themoviedb.spoken_languages, null, 2)} />
//                   <img
//                     style={{ maxHeight: "200px", marginRight: "10px" }}
//                     src={"https://image.tmdb.org/t/p/original" + themoviedb.poster_path}
//                     alt={"poster"}
//                   ></img>
//                   <img
//                     style={{ maxHeight: "200px" }}
//                     src={"https://image.tmdb.org/t/p/original" + themoviedb.backdrop_path}
//                     alt={"backdrop_path"}
//                   ></img>
//                   <Divider/>
//                   <SoftTypography variant="caption">
//                     {JSON.stringify(themoviedb, null, 2)}
//                   </SoftTypography>
//                 </SoftBox>
//               </SoftBox>
//             ) : (
//               <SoftBox></SoftBox>
//             )}
//           </SoftBox>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleClose}>Subscribe</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// EditFilmDialog.propTypes = {
//   id: PropTypes.string.isRequired,
//   isOpen: PropTypes.bool.isRequired,
// };
