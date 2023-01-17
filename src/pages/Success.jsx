import { Box, styled, Typography, useTheme, Button } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from "react-router-dom";

import { useUserState } from "../hooks/useUserState";
import { useEffect } from "react";

const SuccessWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.spacing(2)};
`
export const Success = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { submitted, resetUserState } = useUserState();

  // Only allow success page if it has been submitted
  useEffect(() => {
    if (!submitted) {
      navigate("/");
    }
  }, []);

  const onRestart = () => {
    resetUserState();
    navigate("/")
  }

  return (
    <Box>
      <Typography variant="pageTitle">Success!</Typography>
      <SuccessWrapper>
        <Box display="flex" gap={theme.spacing(1)} alignItems="center">
          <CheckCircleOutlineIcon sx={{ fontSize: "3rem" }} color="success"/>
          <Typography display="inline" >You should receive a confirmation e-mail soon.</Typography>
        </Box>
        <Box display="flex" gap={theme.spacing(1)}>
          <Box flex="1">
            <Button fullWidth size="small" color="primary" variant="contained" type="button" onClick={onRestart}>
              Restart
            </Button>
          </Box>
          <Box flex="1"></Box>
        </Box>
      </SuccessWrapper>
    </Box>
  );
};
