import React from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography"; // Điều này có thể thay đổi đường dẫn import tùy thuộc vào cấu trúc của bạn
import Divider from "@mui/material/Divider";
import FilmContent from "../FilmContent";
import PropTypes from "prop-types";

function TheMovieContent({ themoviedb }) {
  return (
    <SoftBox>
      <SoftTypography variant="h4" color="secondary">
        The Movie DB
      </SoftTypography>
      <Divider />
      <SoftBox>
        <FilmContent title="id" content={themoviedb.id} />
        <FilmContent title="imdb_id" content={themoviedb.imdb_id} />
        <FilmContent title="title" content={themoviedb.title} />
        <FilmContent title="original_title" content={themoviedb.original_title} />
        <FilmContent title="tagline" content={themoviedb.tagline} />
        <FilmContent title="overview" content={themoviedb.overview} />
        <FilmContent title="release_date Date" content={themoviedb.release_date} />
        <FilmContent title="budget" content={themoviedb.budget} />
        <FilmContent title="homepage" content={themoviedb.homepage} />
        <FilmContent title="popularity" content={themoviedb.popularity} />
        <FilmContent title="vote_average" content={themoviedb.vote_average} />
        <FilmContent title="vote_count" content={themoviedb.vote_count} />
        <FilmContent title="adult" content={themoviedb.adult ? "true" : "false"} />
        <FilmContent title="genres" content={JSON.stringify(themoviedb.genres, null, 2)} />
        <FilmContent
          title="production_countries"
          content={JSON.stringify(themoviedb.production_countries, null, 2)}
        />
        <FilmContent
          title="production_companies"
          content={JSON.stringify(themoviedb.production_companies, null, 2)}
        />
        <FilmContent
          title="spoken_languages"
          content={JSON.stringify(themoviedb.spoken_languages, null, 2)}
        />
        <img
          style={{ maxHeight: "200px", marginRight: "10px" }}
          src={"https://image.tmdb.org/t/p/original" + themoviedb.poster_path}
          alt={"poster"}
        />
        <img
          style={{ maxHeight: "200px" }}
          src={"https://image.tmdb.org/t/p/original" + themoviedb.backdrop_path}
          alt={"backdrop_path"}
        />
        <Divider />
        <SoftTypography variant="caption">{JSON.stringify(themoviedb, null, 2)}</SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

TheMovieContent.propTypes = {
  themoviedb: PropTypes.object.isRequired,
};

export default TheMovieContent;
