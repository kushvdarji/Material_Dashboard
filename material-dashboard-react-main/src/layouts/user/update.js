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
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link, useNavigate, useParams } from "react-router-dom";

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
import { toast, ToastContainer } from "react-toastify";

const initialState = {
  firstname: "",
  lastname: "",
  mobile: "",
  password: "",
};

function update() {
  const [kush, setKush] = useState(initialState);
  const [error1] = useState(false);

  const { firstname, lastname, mobile, password } = kush;

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:3500/api/get/${id}`).then((resp) => {
      if (resp.data.success === false) {
        setKush(resp.data.message);
      } else {
        setKush({ ...resp.data.result[0] });
      }
      toast.success(resp.data.message);
    });
  }, [id]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setKush({ ...kush, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstname || !lastname || !mobile || !password) {
      toast.error("fill the data");
    } else {
      Axios.put(`http://localhost:3500/api/put/${id}`, {
        firstname,
        lastname,
        mobile,
        password,
      })
        .then(() => {
          setKush({ firstname: "", lastname: "", mobile: "", password: "" });
        })
        .catch((error) => toast.error(error.resp.data));
      toast.success("updated successfully");
      navigate("/usermanagement");
    }
  };
  const downkey = ["e", "E", "+", "-", "."];
  const exceptThisSymbols = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "*",
    "+",
    "-",
    "/",
    ".",
    ",",
    ";",
    ":",
    "<",
    ">",
    "?",
    "|",
    "]",
    "[",
    "{",
    "}",
    "=",
    "_",
    "~",
    "`",
    ")",
    "(",
    "&",
    "^",
    "%",
    "$",
    "#",
    "@",
    "!",
    "'",
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ToastContainer />
      <Link to="/usermanagement">
        <Button variant="contained" style={{ color: "white" }}>
          Back
        </Button>
      </Link>
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
                <MDTypography
                  variant="h4"
                  color="white"
                  style={{ margin: "auto", textAlign: "center" }}
                >
                  EDIT
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <form
                  style={{
                    textAlign: "center",
                    justifyContent: "center",
                    margin: "auto",
                  }}
                >
                  <TextField
                    label="First Name"
                    name="firstname"
                    variant="standard"
                    className="kush"
                    value={firstname || ""}
                    onChange={handleInputChange}
                    onKeyDown={(e) => exceptThisSymbols.includes(e.key) && e.preventDefault()}
                  />
                  <br />
                  {error1 || firstname.length > 15 ? (
                    <small
                      style={{
                        textAlign: "center",
                        margin: "auto",
                        display: "block",
                        color: "red",
                      }}
                    >
                      Title cannot be more than 15
                    </small>
                  ) : (
                    ""
                  )}
                  <br />
                  <TextField
                    type="text"
                    name="lastname"
                    label="Last Name"
                    variant="standard"
                    className="kush"
                    value={lastname || ""}
                    onChange={handleInputChange}
                    onKeyDown={(e) => exceptThisSymbols.includes(e.key) && e.preventDefault()}
                  />
                  <br />
                  {error1 || lastname.length > 20 ? (
                    <small
                      style={{
                        textAlign: "center",
                        margin: "auto",
                        display: "block",
                        color: "red",
                      }}
                    >
                      Description cannot be more than 20
                    </small>
                  ) : (
                    ""
                  )}
                  <br />
                  <TextField
                    type="number"
                    name="mobile"
                    label="Mobile"
                    variant="standard"
                    className="kush"
                    value={mobile || ""}
                    onChange={handleInputChange}
                    onKeyDown={(e) => downkey.includes(e.key) && e.preventDefault()}
                  />
                  <br />
                  {error1 || mobile.length > 10 ? (
                    <small
                      style={{
                        textAlign: "center",
                        margin: "auto",
                        display: "block",
                        color: "red",
                      }}
                    >
                      Mobile cannot be more than 10
                    </small>
                  ) : (
                    ""
                  )}
                  <br />
                  <TextField
                    type="password"
                    label="Password"
                    name="password"
                    variant="standard"
                    className="kush"
                    value={password || ""}
                    onChange={handleInputChange}
                    onKeyDown={(e) => downkey.includes(e.key) && e.preventDefault()}
                  />
                  <br />
                  {error1 || password.length > 10 ? (
                    <small
                      style={{
                        textAlign: "center",
                        margin: "auto",
                        display: "block",
                        color: "red",
                      }}
                    >
                      Password cannot be more than 10
                    </small>
                  ) : (
                    ""
                  )}
                  <br />
                  <Button
                    variant="contained"
                    style={{
                      color: "white",
                      margin: "auto",
                      display: "flex",
                      marginBottom: "15px",
                    }}
                    onClick={handleSubmit}
                    disabled={
                      firstname.length < 3 ||
                      lastname.length < 3 ||
                      firstname.length > 15 ||
                      lastname.length > 20 ||
                      mobile.length < 10 ||
                      mobile.length > 10 ||
                      password.length < 7 ||
                      password.length > 10
                    }
                  >
                    Submit
                  </Button>
                  <br />
                </form>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default update;
