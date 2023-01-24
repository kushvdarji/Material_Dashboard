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
// import { useState } from "react";
import "./sign-in.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

// react-router-dom components
// import { Link } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast.configure();

function Basic() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  // const [mobile1, setMobile] = useState("");
  const [pass, setPass] = useState("");
  // const [desc, setDesc] = useState("");
  const [error] = useState(false);
  // const [loginStatus, setLoginStatus] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePassChange = (e) => {
    setPass(e.target.value);
  };
  const handleEdit = () => {
    if (!title || !pass) {
      //
    } else {
      Axios.post("http://localhost:3500/login", {
        firstname: title,
        password: pass,
      }).then((response) => {
        if (response.data.success === true) {
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/dashboard");
          }, 3000);
        } else {
          toast.error(response.data.message);
        }
      });
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
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign In
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <a href="https://www.facebook.com/login" variant="body1" color="white">
                <FacebookIcon color="white" />
              </a>
            </Grid>
            <Grid item xs={2}>
              <a href="https://github.com/login" variant="body1" color="white">
                <GitHubIcon color="white" />
              </a>
            </Grid>
            <Grid item xs={2}>
              <a href="https://www.google.com/" variant="body1" color="white">
                <GoogleIcon color="white" />
              </a>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <ToastContainer />
          <form
            style={{
              textAlign: "center",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            <TextField
              label="First Name"
              variant="standard"
              className="kush"
              value={title}
              onChange={(e) => handleTitleChange(e)}
              onKeyDown={(e) => exceptThisSymbols.includes(e.key) && e.preventDefault()}
            />
            <br />
            {error || title.length > 15 ? (
              <small
                style={{ textAlign: "center", margin: "auto", display: "block", color: "red" }}
              >
                Title cannot be more than 15
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
              value={pass}
              onChange={(e) => handlePassChange(e)}
              onKeyDown={(e) => downkey.includes(e.key) && e.preventDefault()}
            />
            <br />
            {error || pass.length > 10 ? (
              <small
                style={{ textAlign: "center", margin: "auto", display: "block", color: "red" }}
              >
                Password cannot be more than 10
              </small>
            ) : (
              ""
            )}
          </form>
          <br />
          <Button
            type="button"
            variant="contained"
            style={{ color: "white", margin: "auto", display: "flex", marginBottom: "15px" }}
            onClick={handleEdit}
            disabled={title.length < 3 || title.length > 15 || pass.length < 7 || pass.length > 10}
          >
            Submit
          </Button>
          <h2
            style={{
              zIndex: "999",
              color: "red",
              display: "absolute",
              margin: "auto",
              textAlign: "center",
            }}
          >
            {/* {loginStatus} */}
          </h2>
          Don&apos;t have an Account :&nbsp;
          <Link to="/authentication/sign-up">
            <b>Sign Up</b>
          </Link>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
