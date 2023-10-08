// React import
import React from "react";

// react-router components
import { Link } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FilmCard from "examples/Cards/FilmCard";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Images
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

// Service API
import FilmService from "services/examples/film.service";
import Footer from "examples/Footer";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

function Film() {
  const filmService = new FilmService();
  const [keySearch, setKeySearch] = React.useState("");
  const [pageIndex, setPageIndex] = React.useState(1);
  const [data, setData] = React.useState();
  const [filmList, setFilmList] = React.useState([]);

  React.useEffect(() => {
    getList(pageIndex);
  }, [pageIndex]);

  const getList = async (page, nameSearch) => {
    try {
      const res = await filmService.getList(page, nameSearch);
      if (res.status === 200) {
        setData(res.data);
        setFilmList(res.data.data);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (event, page) => {
    setPageIndex(page);
  };

  const onSearchClick = () => {
    setPageIndex(1);
    getList(1, keySearch);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mb={3}>
        <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              <SoftTypography variant="h6" fontWeight="medium">
                FILM LIST
              </SoftTypography>
            </SoftBox>
            <SoftBox mb={1} display="flex" alignItems="center" onClick={onSearchClick}>
              <SoftButton mr={1}>Search</SoftButton>
              <SoftInput
                value={keySearch}
                onChange={(event) => {
                  setKeySearch(event.target.value);
                }}
              ></SoftInput>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              {filmList.length > 0 &&
                filmList.map((item, index) => (
                  <Grid key={index} item xs={12} md={4} xl={3}>
                    <Link to={`/film/${item._id}`}>
                      <FilmCard
                        image={item.thumbnail}
                        label={item.type === 2 ? "movie" : "tv show"}
                        title={item.name}
                        description={item.soundtrack_count ?? "No Sound"}
                        action={{
                          type: "internal",
                          route: "/film",
                          color: "info",
                          label: "view project",
                        }}
                        authors={[
                          { image: team1, name: "Elena Morison" },
                          { image: team2, name: "Ryan Milly" },
                          { image: team3, name: "Nick Daniel" },
                          { image: team4, name: "Peterson" },
                        ]}
                      />
                    </Link>
                  </Grid>
                ))}
            </Grid>
          </SoftBox>
          <SoftBox pt={2} px={2} mb={2}>
            <Pagination
              onChange={handlePageChange}
              count={data != undefined ? data.total_pages : 10}
              color="secondary"
              variant="outlined"
              shape="rounded"
            />
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Film;
