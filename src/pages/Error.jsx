import { Box, styled, Typography, useTheme, Button } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from "react-router-dom";

import { useUserState } from "../hooks/useUserState";

const ErrorWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.spacing(2)};
`
export const Error = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { resetUserState } = useUserState();

  const onRestart = () => {
    resetUserState();
    navigate("/")
  }

  return (
    <Box>
      <Typography variant="pageTitle">Error</Typography>
      <ErrorWrapper>
        <Box display="flex" gap={theme.spacing(1)} alignItems="center">
          <CheckCircleOutlineIcon sx={{ fontSize: "3rem" }} color="error"/>
          <Typography display="inline" >Uh Oh, something went wrong. Please try again later.</Typography>
        </Box>
        <Box display="flex" gap={theme.spacing(1)}>
          <Box flex="1">
            <Button fullWidth size="small" color="primary" variant="contained" type="button" onClick={onRestart}>
              Restart
            </Button>
          </Box>
          <Box flex="1"></Box>
        </Box>
      </ErrorWrapper>
    </Box>
  );
};
