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

function Film() {
  const filmService = new FilmService();
  const [pageIndex, setPageIndex] = React.useState(1);
  const [data, setData] = React.useState();
  const [filmList, setFilmList] = React.useState([]);

  React.useEffect(() => {
    getList(pageIndex);
  }, [pageIndex]);

  const getList = async (page) => {
    try {
      const res = await filmService.getList(page);
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
            <SoftBox mb={1}>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                Film management
              </SoftTypography>
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
                        label="project #2"
                        title={item.name}
                        description="As Uber works through a huge amount of internal management turmoil."
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
