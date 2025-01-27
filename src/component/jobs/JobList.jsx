import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../features/jobs/jobSlice"; // Import action
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const JobList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, loading, error } = useSelector((state) => state.jobList);

  useEffect(() => {
    dispatch(fetchJobs()); // Fetch all jobs on component mount
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Job Listings
      </Typography>

      {loading && <CircularProgress size={40} sx={{ display: "block", mx: "auto", mt: 4 }} />}
      {error && <Typography color="error" align="center">{error}</Typography>}

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6">{job.title}</Typography>
                <Typography color="textSecondary">{job.location}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {job.description.substring(0, 100)}...
                </Typography>
                <Typography color="primary" sx={{ mt: 1 }}>
                  Salary: {job.salary}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate(`/jobs/${job.id}`)}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default JobList;
