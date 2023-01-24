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
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDButton from "components/MDButton";
import Axios from "axios";
import "./index.css";
import { toast, ToastContainer } from "react-toastify";
import { TextField } from "@mui/material";

function User() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await Axios("http://localhost:3500/get");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are You Sure You Want To Delete")) {
      Axios.delete(`http://localhost:3500/delete/${id}`);
      toast.success("Deleted Successfully", { position: "top-center" });
      setTimeout(() => loadData(), 500);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ToastContainer />
      <h1>User ManageMent</h1>
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
                <Link to="/layouts/user/add">
                  <MDButton
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      padding: "15px 15px 15px 15px",
                    }}
                  >
                    Add
                  </MDButton>
                </Link>
                &nbsp;
                <span>
                  <TextField
                    variant="outlined"
                    label="Search"
                    style={{
                      backgroundColor: "white",
                      // direction: "rtl",
                      textAlign: "right",
                      justifyContent: "right",
                      // outline: "",
                    }}
                  />
                </span>
              </MDBox>
              <MDBox pt={3}>
                <table>
                  <thead>
                    <tr>
                      {/* <th>Id</th> */}
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Mobile No.</th>
                      <th>Password</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.mobile}</td>
                        <td>{item.password}</td>
                        <td>
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default User;
