import { Box, Typography, Button, styled, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useUserState } from "../hooks/useUserState";

const DataWrapper = styled(Box)`
  display: flex;
`

const DataLabel = styled(Typography)`
  font-weight: 500;
  flex: 1;
`

const DataValue = styled(Typography)`
  flex: 1;
`

const ConfirmationData = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.spacing(1)};
`
export const Confirmation = () => {
  const { name, email, password, color, terms, setMoreInfo } = useUserState();
  const navigate = useNavigate();
  const theme = useTheme();

  // Make sure everything filled out to get to confirmation
  useEffect(() => {
    if (!name || !email || !password || !color || !terms) {
      navigate("/");
    }
  }, []);

  const onBack = () => {
    navigate("/more-info");
  };

  const onSubmit = () => {

    navigate("/success");
  }

  return (
    <Box>
      <Typography variant="pageTitle">Confirmation</Typography>
      <ConfirmationData>
        <DataWrapper>
          <DataLabel>First Name</DataLabel>
          <DataValue>{ name }</DataValue>
        </DataWrapper>
        <DataWrapper>
          <DataLabel>E-Mail</DataLabel>
          <DataValue>{ email }</DataValue>
        </DataWrapper>
        <DataWrapper>
          <DataLabel>Password</DataLabel>
          <DataValue>{ password.split('').map(_ => '•').join('') }</DataValue>
        </DataWrapper>
        <DataWrapper>
          <DataLabel>Favorite Color</DataLabel>
          <DataValue>{ color }</DataValue>
        </DataWrapper>
        <Box display="flex" gap={theme.spacing(1)}>
          <Box flex="1">
            <Button fullWidth size="small" type="button" onClick={onBack}>
              Back
            </Button>
          </Box>
          <Box flex="1">
            <Button fullWidth size="small" type="button" variant="contained" onClick={onSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      </ConfirmationData>
    </Box>
  );
};
