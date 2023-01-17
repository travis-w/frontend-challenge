import { Box, Typography } from "@mui/material"
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
      email: yup
        .boolean()
        .equals(true)
    }),
    onSubmit: (values) => {
      setMoreInfo(values);
      navigate('/confirmation')
    }
  });

  return (
    <Box>
      <Typography variant="pageTitle">Additional Info</Typography>
    </Box>
  )
}