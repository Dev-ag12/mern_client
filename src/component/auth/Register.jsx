import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { 
  register, 
  sendEmailOTP, 
  verifyEmailOTP, 
  sendMobileOTP, 
  verifyMobileOTP 
} from "../../features/auth/authSlice";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Grid,
  Link,
  CircularProgress,
} from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    employees: "",
    registeredNumber: "",
    email: "",
    location: "",
    mobile: "",
    password: "",
    emailOTP: "",
    mobileOTP: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, emailVerified, mobileVerified, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Registration successful! Redirecting to login...");
      navigate("/login");
    }

    if (error) {
      toast.error(error);
    }
  }, [isAuthenticated, error, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Submit Registration First, Then Verify OTPs
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(formData)).then((res) => {
      if (res.payload) {
        toast.info("Company registered!");
      }
    });
  };

  const handleSendEmailOTP = () => {
    dispatch(sendEmailOTP(formData.email));
    toast.info("Email OTP sent!");
  };

  const handleVerifyEmailOTP = () => {
    const storedOtp = localStorage.getItem('emailOtp');
    console.log("storedotp",storedOtp);

  if (storedOtp === formData.emailOTP) {
    localStorage.removeItem('emailOtp');
    toast.success("Email verified!");
    dispatch({ type: 'auth/emailVerified', payload: true });
  } else {
    toast.error("Invalid OTP, please try again.");
  }
  };

  const handleSendMobileOTP = () => {
    dispatch(sendMobileOTP(formData.mobile));
    toast.info("Mobile OTP sent!");
  };

  const handleVerifyMobileOTP = () => {
    dispatch(verifyMobileOTP({ mobile: formData.mobile, otp: formData.mobileOTP }));
    toast.success("Mobile verified!");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        marginTop:"100px"
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register Your Company
        </Typography>
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Company Name" name="companyName" variant="outlined" required value={formData.companyName} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Number of Employees" name="employees" type="number" variant="outlined" required value={formData.employees} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Company Registered Number" name="registeredNumber" variant="outlined" required value={formData.registeredNumber} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Company Location" name="location" variant="outlined" required value={formData.location} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Password" name="password" type="password" variant="outlined" required value={formData.password} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={8}>
              <TextField fullWidth label="Mobile Number" name="mobile" type="tel" variant="outlined" required value={formData.mobile} onChange={handleChange} />
            </Grid>

            {/* Email Verification */}
            <Grid item xs={12} sm={8}>
              <TextField fullWidth label="Company Email" name="email" type="email" variant="outlined" required value={formData.email} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              {!emailVerified && (
                <Button variant="contained" color="secondary" fullWidth onClick={handleSendEmailOTP}>
                  Send OTP
                </Button>
              )}
            </Grid>
            <Grid item xs={12}>
              {!emailVerified && (
                <>
                  <TextField fullWidth label="Enter Email OTP" name="emailOTP" variant="outlined" required value={formData.emailOTP} onChange={handleChange} />
                  <Button variant="contained" color="primary" fullWidth onClick={handleVerifyEmailOTP}>
                    Verify Email OTP
                  </Button>
                </>
              )}
            </Grid>
          </Grid>

          {/* Register Button Only Active After Verification */}
          <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }} disabled={loading || emailVerified}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
          </Button>

          {/* Already Registered? Login Here */}
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already registered?{" "}
            <Link component="button" variant="body2" onClick={() => navigate("/login")} sx={{ textDecoration: "underline", cursor: "pointer" }}>
              Log in
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
