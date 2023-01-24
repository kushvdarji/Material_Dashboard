import React, { useState } from "react";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";
import TextField from "@mui/material/TextField";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function Otp() {
  const navigate = useNavigate();
  const [otp1, setOtp1] = useState("");
  const handleOtp = () => {
    // toast.success("login successful");
    // setInterval(() => {
    //   navigate("/authentication/sign-in");
    // }, 5000);
    Axios.post("http://localhost:3500/otpverify", {
      otp: otp1,
    }).then((response) => {
      console.log(response);
      if (response.data.success === false) {
        // setLoginStatus(response.data.message);
        toast.error(response.data.message);
      } else {
        // setLoginStatus(response.data[0]);
        toast.success(response.data.message);
        console.log(response);
        setInterval(() => {
          navigate("/authentication/sign-in");
        }, 3000);
      }
    });
  };
  return (
    <div>
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
              OTP VERIFICTION
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <ToastContainer />
            <TextField
              type="text"
              label="OTP"
              variant="standard"
              className="kush"
              value={otp1}
              onChange={(e) => setOtp1(e.target.value)}
              style={{ textAlign: "center", margin: "auto", display: "flex", marginBottom: "35px" }}
            />
          </MDBox>
          <Button
            onClick={handleOtp}
            variant="contained"
            style={{ color: "white", margin: "auto", display: "flex", marginBottom: "35px" }}
          >
            Verify
          </Button>
        </Card>
      </BasicLayout>
    </div>
  );
}

export default Otp;
