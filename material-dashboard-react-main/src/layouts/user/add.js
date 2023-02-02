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
import { useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import Otp from "./Otp";
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
// import DataTable from "examples/Tables/DataTable";

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";

function add() {
  //   const { columns, rows } = authorsTableData();
  //   const { columns: pColumns, rows: pRows } = projectsTableData();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mobile1, setMobile] = useState("");
  const [pass, setPass] = useState("");
  //   const [userId, setUserId] = useState("");
  //   const [emailId, setEmailId] = useState("");
  // const [Id] = useState("");

  const [error] = useState(false);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };
  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };
  const handlePassChange = (e) => {
    setPass(e.target.value);
  };
  //   const handleUserChange = (e) => {
  //     setUserId(e.target.value);
  //   };
  //   const handleEmailChange = (e) => {
  //     setEmailId(e.target.value);
  //   };

  const handleSubmit = () => {
    if (!title || !desc || !mobile1 || !pass) {
      // console.log("Enter The Values");
      alert("Fill The inputs Properly");
    } else {
      Axios.post("http://localhost:3500/adduser", {
        firstname: title,
        lastname: desc,
        mobile: mobile1,
        password: pass,
      }).then((response) => {
        console.log(response);
      });
      navigate("/usermanagement");
      // console.log({ title, desc });
      // const blogs =
      //   localStorage.getItem("blogs") && localStorage.getItem("blogs").length > 0
      //     ? JSON.parse(localStorage.getItem("blogs"))
      //     : [];
      // localStorage.setItem("blogs", JSON.stringify([...blogs, { title, desc, mobile, pass }]));
      //   Axios.post("http://localhost:3500/otp", {
      //     user_id: userId,
      //     email: emailId,
      //   });
      //   toast.info(Otp);
    }
  };
  const handleEdit = (blogIndex) => {
    localStorage.setItem("editIndex", blogIndex);
    // navigate("/edit");
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
                  ADD
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <form
                  style={{
                    // marginTop: "25px",
                    textAlign: "center",
                    justifyContent: "center",
                    margin: "auto",
                  }}
                >
                  <TextField
                    label="First Name"
                    variant="standard"
                    className="kush"
                    // style={{ marginTop: "35px" }}
                    value={title}
                    onChange={(e) => handleTitleChange(e)}
                    onKeyDown={(e) => exceptThisSymbols.includes(e.key) && e.preventDefault()}
                    // style={{ width: "100%" }}
                  />
                  <br />
                  {error || title.length > 15 ? (
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
                    label="Last Name"
                    variant="standard"
                    className="kush"
                    // style={{ marginTop: "15px" }}
                    value={desc}
                    onChange={(e) => handleDescChange(e)}
                    onKeyDown={(e) => exceptThisSymbols.includes(e.key) && e.preventDefault()}
                  />
                  <br />
                  {error || desc.length > 20 ? (
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
                    label="Mobile"
                    variant="standard"
                    className="kush"
                    // style={{ marginTop: "35px" }}
                    value={mobile1}
                    onChange={(e) => handleMobileChange(e)}
                    onKeyDown={(e) => downkey.includes(e.key) && e.preventDefault()}
                  />
                  <br />
                  {error || mobile1.length > 10 ? (
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
                    variant="standard"
                    className="kush"
                    // style={{ marginTop: "35px" }}
                    value={pass}
                    onChange={(e) => handlePassChange(e)}
                    // onKeyDown={(e) => downkey.includes(e.key) && e.preventDefault()}
                  />
                  <br />
                  {error || pass.length > 10 ? (
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
                  {/* <TextField
                    type="text"
                    label="userid"
                    variant="standard"
                    className="kush"
                    // style={{ marginTop: "35px" }}
                    value={userId}
                    onChange={(e) => handleUserChange(e)}
                    onKeyDown={(e) => downkey.includes(e.key) && e.preventDefault()}
                  />
                  <br />
                  {error || pass.length > 10 ? (
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
                  <TextField
                    type="email"
                    label="emailId"
                    variant="standard"
                    className="kush"
                    // style={{ marginTop: "35px" }}
                    value={emailId}
                    onChange={(e) => handleEmailChange(e)}
                    // onKeyDown={(e) => downkey.includes(e.key) && e.preventDefault()}
                  />
                  <br />
                  {error || pass.length > 10 ? (
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
                  )} */}
                  <br />
                  <Button
                    variant="contained"
                    // style={{ marginTop: "30px" }}
                    style={{
                      color: "white",
                      margin: "auto",
                      display: "flex",
                      marginBottom: "15px",
                    }}
                    onClick={handleSubmit}
                    onMouseDown={handleEdit}
                    disabled={
                      title.length < 3 ||
                      desc.length < 3 ||
                      title.length > 15 ||
                      desc.length > 20 ||
                      mobile1.length < 10 ||
                      mobile1.length > 10 ||
                      pass.length < 7 ||
                      pass.length > 10
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

export default add;
