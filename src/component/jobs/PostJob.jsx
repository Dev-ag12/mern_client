import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postJob, resetPostJob } from "../../features/jobs/postJobSlice"; // Import postJob action
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    type: "full-time",
    benefits: "",
    applicationDeadline: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector((state) => state.postJob);
  console.log("success",success);

  useEffect(() => {
    if (success) {
      toast.success("Job posted successfully!");
      dispatch(resetPostJob()); // Reset state
      navigate("/jobs");
    }
    if (error) {
      toast.error(error);
      dispatch(resetPostJob());
    }
  }, [success, error, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const jobData = {
      ...formData,
      requirements: formData.requirements.split("\n").map((req) => req.trim()), // Convert to array
      benefits: formData.benefits.split("\n").map((benefit) => benefit.trim()), // Convert to array
    };

    console.log("postjobdata", jobData);

    dispatch(postJob(jobData)); // Dispatch action to post job
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        mt: 10, // Added space from navbar
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Post a New Job
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Title"
                name="title"
                variant="outlined"
                required
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Description"
                name="description"
                variant="outlined"
                multiline
                rows={4}
                required
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Requirements (one per line)"
                name="requirements"
                variant="outlined"
                multiline
                rows={4}
                required
                value={formData.requirements}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                variant="outlined"
                required
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Salary"
                name="salary"
                variant="outlined"
                required
                value={formData.salary}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Job Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  label="Job Type"
                >
                  <MenuItem value="full-time">Full Time</MenuItem>
                  <MenuItem value="part-time">Part Time</MenuItem>
                  <MenuItem value="contract">Contract</MenuItem>
                  <MenuItem value="internship">Internship</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Application Deadline"
                name="applicationDeadline"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                required
                value={formData.applicationDeadline}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Post Job"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PostJob;
