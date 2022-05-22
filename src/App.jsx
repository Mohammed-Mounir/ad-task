import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import Music from "./components/music/Music";

const theme = createTheme({});

const StyledTypography = styled(Typography)(({ theme }) => ({
  pointerEvents: "none",
  textTransform: "uppercase",
  color: "#fff",
  animation: "logoFloat infinite 3s ease-in-out",
  "@keyframes logoFloat": {
    "0%": {
      transform: "translateY(0)",
    },
    "50%": {
      transform: "translateY(10px)",
    },
    "100%": {
      transform: "translateY(0px)",
    },
  },
}));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth={false}
        sx={{
          backgroundImage:
            "linear-gradient(to right, #f07791 -10%, #624198 50%)",
          minHeight: "100vh",
        }}
      >
        <StyledTypography component="h1" variant="h4" align="center" pt={4}>
          Music
        </StyledTypography>
        <Music />
      </Container>
    </ThemeProvider>
  );
}

export default App;
