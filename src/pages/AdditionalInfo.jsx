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
  styled,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { useUserState } from "../hooks/useUserState";
import { Form } from "../components/Form";

export const AdditionalInfo = () => {
  const { name, email, password, color, terms, setMoreInfo } = useUserState();
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Don't let user start on more info page
  useEffect(() => {
    if (!name || !email || !password) {
      navigate("/");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      color,
      terms,
    },
    validationSchema: yup.object({
      color: yup.string().required("Favorite color is required"),
      terms: yup.bool().oneOf([true], "You must agree to the terms and conditions"),
    }),
    onSubmit: (values) => {
      setMoreInfo(values);
      navigate("/confirmation");
    },
  });

  const onBack = () => {
    navigate("/");
  };

  return (
    <Box>
      <Typography variant="pageTitle">Additional Info</Typography>
      <Form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth size="small">
          <InputLabel id="test-test">Favorite Color</InputLabel>
          <Select
            fullWidth
            name="color"
            labelId="test-test"
            label="Favorite Color"
            value={formik.values.color}
            onChange={formik.handleChange}
            error={formik.touched.color && Boolean(formik.errors.color)}
          >
            <MenuItem value="blue">Blue</MenuItem>
            <MenuItem value="red">Red</MenuItem>
          </Select>

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
                sx={{ ":hover":  { backgroundColor: "transparent !important" }, padding: "0 9px" }}
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
