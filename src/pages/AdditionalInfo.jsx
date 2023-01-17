import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  FormControlLabel,
  useTheme,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { useUserState } from "../hooks/useUserState";
import { Form } from "../components/Form";
import { getColors } from "../api";

const SelectSpinner = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress sx={{ padding: ".65rem" }} />
    </Box>
  );
};

export const AdditionalInfo = () => {
  const {
    name,
    email,
    password,
    color,
    terms,
    submitted,
    submitError,
    setMoreInfo,
  } = useUserState();
  const navigate = useNavigate();
  const theme = useTheme();

  const [colorChoices, setColorChoices] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [loadingColors, setLoadingColors] = useState(false);

  const loadColors = async () => {
    setLoadingColors(true);
    try {
      setColorChoices(await getColors());
    } catch {
      setShowSnackbar(true);
    }
    setLoadingColors(false);
  };

  useEffect(() => {
    if (!name || !email || !password) {
      // Don't let user start on more info page or view
      navigate("/");
    } else if (submitted) {
      navigate(submitError ? "/error" : "/success");
    } else {
      // Grab colors
      loadColors();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      color,
      terms,
    },
    validationSchema: yup.object({
      color: yup.string().required("Favorite color is required"),
      terms: yup
        .bool()
        .oneOf([true], "You must agree to the terms and conditions"),
    }),
    onSubmit: (values) => {
      setMoreInfo(values);
      navigate("/confirmation");
    },
  });

  const onBack = () => {
    navigate("/");
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSnackbar(false);
  };

  return (
    <Box>
      <Typography variant="pageTitle">Additional Info</Typography>
      <Form onSubmit={formik.handleSubmit}>
        <FormControl
          fullWidth
          size="small"
          disabled={colorChoices.length === 0}
        >
          <InputLabel id="favorite-color-label">
            {loadingColors
              ? "Loading Color Choices..."
              : colorChoices.length === 0
              ? "Error Loading Colors. Click to Refresh"
              : "Favorite Color"}
          </InputLabel>
          <Select
            fullWidth
            name="color"
            labelId="favorite-color-label"
            label="Favorite Color"
            value={formik.values.color}
            onChange={formik.handleChange}
            onClick={
              !loadingColors && colorChoices.length === 0
                ? loadColors
                : undefined
            }
            error={formik.touched.color && Boolean(formik.errors.color)}
            disabled={colorChoices.length === 0}
            IconComponent={
              loadingColors
                ? SelectSpinner
                : colorChoices.length === 0
                ? RefreshIcon
                : undefined
            }
          >
            {colorChoices.map((x) => (
              <MenuItem value={x} key={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
          <Snackbar
            open={showSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="error"
              sx={{ width: "100%" }}
            >
              Error loading colors.
            </Alert>
          </Snackbar>
          <FormHelperText
            error={formik.touched.color && Boolean(formik.errors.color)}
          >
            {formik.touched.color && formik.errors.color}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth size="small">
          <FormControlLabel
            sx={{ display: "block" }}
            control={
              <Checkbox
                disableRipple
                checked={formik.values.terms}
                onChange={formik.handleChange}
                name="terms"
                sx={{
                  ":hover": { backgroundColor: "transparent !important" },
                  padding: "0 9px",
                }}
              />
            }
            label="I agree to the terms and conditions"
          />
          <FormHelperText
            error={formik.touched.terms && Boolean(formik.errors.terms)}
          >
            {formik.touched.terms && formik.errors.terms}
          </FormHelperText>
        </FormControl>
        <Box display="flex" gap={theme.spacing(1)}>
          <Box flex="1">
            <Button fullWidth size="small" type="button" onClick={onBack}>
              Back
            </Button>
          </Box>
          <Box flex="1">
            <Button fullWidth size="small" type="submit" variant="contained">
              Next
            </Button>
          </Box>
        </Box>
      </Form>
    </Box>
  );
};
