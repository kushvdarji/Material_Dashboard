/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import Axios from "axios";
import React, { useState, useEffect } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

function Tables() {
  // const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [data, setData] = useState("");
  const loadData = async () => {
    const response = await Axios.get("http://localhost:3500/table/get");
    console.log(response);
    setData(response.data);
  };
  console.log(data);
  useEffect(() => {
    loadData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Authors Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <table style={{ fontSize: "small", color: "gray" }}>
                  <thead>
                    <tr>
                      {/* <th>Id</th> */}
                      <th>Authors</th>
                      <th>Function</th>
                      <th>Employed</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item) => (
                        <tr>
                          <td>{item.AUTHOR}</td>
                          <td>{item.FUNCTION}</td>
                          <td>{item.EMPLOYED}</td>
                          <td>Edit</td>
                          {/* <td>
                          <Button
                            type="submit"
                            variant="contained"
                            style={{ color: "white" }}
                            onClick={() => navigate(`/layouts/user/update/${item.id}`)}
                          >
                            Edit
                          </Button>
                          &nbsp;
                          <Button
                            type="submit"
                            variant="contained"
                            style={{ color: "white" }}
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </Button>
                        </td> */}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
