import { Box, Button, Checkbox, FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography, FormControlLabel } from "@mui/material"
import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { useUserState } from "../hooks/useUserState"

export const AdditionalInfo = () => {
  const { name, email, password, color, terms, setMoreInfo } = useUserState();
  const navigate = useNavigate();

  // Don't let user start on more info page
  useEffect(() => {
    if (!name || !email || !password) {
      navigate('/')
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      color,
      terms
    },
    validationSchema: yup.object({
      color: yup
        .string()
        .required('Favorite color is required'),
      terms: yup
        .bool()
        .oneOf([true])
    }),
    onSubmit: (values) => {
      setMoreInfo(values);
      navigate('/confirmation')
    }
  });

  const onBack = () => {
    navigate('/')
  }

  return (
    <Box>
      <Typography variant="pageTitle">Additional Info</Typography>
      <form onSubmit={formik.handleSubmit}>
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
          
          <FormHelperText error={formik.touched.color && Boolean(formik.errors.color)}>{formik.touched.color && formik.errors.color}</FormHelperText>
        </FormControl>
        <FormControlLabel 
          sx={{ display: "block" }}
          control={
            <Checkbox value={formik.values.terms} onChange={formik.handleChange} name="terms" />
          }
          label="Label" 
        />
        
        <Button type="button" onClick={onBack}>Back</Button>
        <Button type="submit" variant="contained">Next</Button>
      </form>
    </Box>
  )
}