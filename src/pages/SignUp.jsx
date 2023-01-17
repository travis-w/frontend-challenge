import { Box, TextField, Typography, Button, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useEffect } from "react";

import { useUserState } from "../hooks/useUserState";
import { Form } from "../components/Form";

export const SignUp = () => {
  const { name, email, password, submitError, submitted, setUserInfo } =
    useUserState();
  const navigate = useNavigate();
  const theme = useTheme();

  // If submitted, make sure user refreshes/restarts
  useEffect(() => {
    if (submitted) {
      navigate(submitError ? "/error" : "/success");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name,
      email,
      password,
    },
    validationSchema: yup.object({
      name: yup
        .string("Enter your first name")
        .required("First name is required"),
      email: yup
        .string("Enter your e-mail")
        .required("E-Mail is required")
        .email("Enter a valid e-mail address"),
      password: yup
        .string("Enter your password")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      setUserInfo(values);
      navigate("/more-info");
    },
  });

  return (
    <Box>
      <Typography variant="pageTitle">Sign Up</Typography>
      <Form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          size="small"
          label="First Name"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          size="small"
          label="E-Mail"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          size="small"
          label="Password"
          type="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Box display="flex" gap={theme.spacing(1)}>
          <Box flex="1"></Box>
          <Box flex="1">
            <Button
              fullWidth
              size="small"
              color="primary"
              variant="contained"
              type="submit"
            >
              Next
            </Button>
          </Box>
        </Box>
      </Form>
    </Box>
  );
};
