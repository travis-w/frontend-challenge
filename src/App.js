import { Container, CssBaseline, styled, ThemeProvider } from "@mui/material"
import { RouterProvider } from "react-router-dom"

import { theme } from "./styles/theme"
import { router } from "./router"
import { UserStateProvider } from "./hooks/useUserState";

const Wrapper = styled(Container)`
  padding-top: ${({theme}) => theme.spacing(3)};
`;

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserStateProvider>
        <CssBaseline />
        <Wrapper>
          <RouterProvider router={router} />
        </Wrapper>
      </UserStateProvider>
    </ThemeProvider>
  )
}
