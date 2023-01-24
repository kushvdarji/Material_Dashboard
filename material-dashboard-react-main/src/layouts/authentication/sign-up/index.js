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
// import Otp from "./Otp";
import "../sign-in";
import Axios from "axios";
import { useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
// react-router-dom components
// import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { toast } from "react-toastify";
import Otp from "./Otp";

function Cover() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mobile1, setMobile] = useState("");
  const [pass, setPass] = useState("");
  const [userId, setUserId] = useState("");
  const [emailId, setEmailId] = useState("");
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
  const handleUserChange = (e) => {
    setUserId(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmailId(e.target.value);
  };

  const handleSubmit = () => {
    if (!title || !desc || !mobile1 || !pass) {
      // console.log("Enter The Values");
      alert("Fill The inputs Properly");
    } else {
      Axios.post("http://localhost:3500/register", {
        firstname: title,
        lastname: desc,
        mobile: mobile1,
        password: pass,
      }).then((response) => {
        console.log(response);
      });
      // console.log({ title, desc });
      // const blogs =
      //   localStorage.getItem("blogs") && localStorage.getItem("blogs").length > 0
      //     ? JSON.parse(localStorage.getItem("blogs"))
      //     : [];
      // localStorage.setItem("blogs", JSON.stringify([...blogs, { title, desc, mobile, pass }]));
      navigate("/layouts/authentication/sign-up/Otp");
      Axios.post("http://localhost:3500/otp", {
        user_id: userId,
        email: emailId,
      });
      toast.info(Otp);
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
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            New Account
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <br />
        <form
          style={{
            // marginTop: "25px",
            textAlign: "center",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <TextField
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
          <br />
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
            <small style={{ textAlign: "center", margin: "auto", display: "block", color: "red" }}>
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
            <small style={{ textAlign: "center", margin: "auto", display: "block", color: "red" }}>
              Description cannot be more than 20
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
          <br />
          <TextField
            type="password"
            label="Password"
            variant="standard"
            className="kush"
            // style={{ marginTop: "35px" }}
            value={pass}
            onChange={(e) => handlePassChange(e)}
            onKeyDown={(e) => downkey.includes(e.key) && e.preventDefault()}
          />
          <br />
          {error || pass.length > 10 ? (
            <small style={{ textAlign: "center", margin: "auto", display: "block", color: "red" }}>
              Password cannot be more than 10
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
            <small style={{ textAlign: "center", margin: "auto", display: "block", color: "red" }}>
              Mobile cannot be more than 10
            </small>
          ) : (
            ""
          )}
          <br />
          <Button
            variant="contained"
            // style={{ marginTop: "30px" }}
            style={{ color: "white", margin: "auto", display: "flex", marginBottom: "15px" }}
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
          Already have an Account :&nbsp;
          <Link to="/authentication/sign-in">
            <b>Sign In</b>
          </Link>
          <br />
        </form>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
