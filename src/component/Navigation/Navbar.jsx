import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("Invalid user. Please log in.");
    }
  }, [token]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token"); // Ensure token is removed
    navigate("/login"); // Redirect to login page after logout
  };

  const handleNavigation = (path) => {
    if (token) {
      navigate(path);
    } else {
      toast.error("Invalid user. Please log in.");
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Job Portal
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => handleNavigation("/jobs")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => handleNavigation("/jobslist")}>
            All Jobs
          </Button>

          {token ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
