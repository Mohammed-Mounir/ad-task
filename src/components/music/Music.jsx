import { useState } from "react";
import { useSelector } from "react-redux";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

import Singers from "../singers/Singers";
import Albums from "../albmus/Albums";
import Songs from "../songs/Songs";
import SubmitRequest from "../submit-request/SubmitRequest";
import Receipt from "../receipt/Receipt";

const Item = styled(Paper)(({ theme }) => ({
  width: "85px",
  padding: theme.spacing(1, 2),
  margin: theme.spacing(2, 1),
  textAlign: "center",
  backgroundImage: "linear-gradient(to right, #f07791 -10%, #624198 50%)",
  color: "white",
}));

const steps = [
  "Select Singers",
  "Select Albums",
  "Select Songs",
  "Submit Request",
];

const getStepContent = (step, stepNextHandler) => {
  switch (step) {
    case 0:
      return <Singers />;
    case 1:
      return <Albums />;
    case 2:
      return <Songs />;
    case 3:
      return <SubmitRequest onSubmit={stepNextHandler} />;
    default:
      throw new Error("Unknown step");
  }
};

const Music = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { count, totalAmount } = useSelector((state) => state.cart);

  const stepNextHandler = () => {
    if (count === 0) return;
    setActiveStep((currentActiveStep) => currentActiveStep + 1);
  };

  const stepBackHandler = () => {
    setActiveStep((currentActiveStep) => currentActiveStep - 1);
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper
        variant="outlined"
        sx={{
          my: { xs: 3, md: 6 },
          p: { xs: 2, md: 3 },
        }}
      >
        <Grid container display="flex" justifyContent="center">
          <Grid
            item
            sm={9}
            sx={{
              pl: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "stretch",
              flexDirection: "column",
              height: "400px",
            }}
          >
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <>
              {activeStep === steps.length ? (
                <Box sx={{ flexGrow: 1 }}>
                  <Receipt />
                </Box>
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {getStepContent(activeStep, stepNextHandler)}
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {activeStep !== 0 && (
                      <Button
                        color="secondary"
                        onClick={stepBackHandler}
                        sx={{ mt: 3, ml: 1 }}
                        startIcon={<ArrowBackIos />}
                      >
                        Back
                      </Button>
                    )}

                    {activeStep === steps.length - 1 ? null : (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={stepNextHandler}
                        sx={{ mt: 3, ml: 1 }}
                        endIcon={<ArrowForwardIos />}
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </>
              )}
            </>
          </Grid>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ pl: 3, display: { xs: "none", md: "block" } }}
            sm={1}
          />

          <Grid
            item
            sm={2}
            sx={{
              pl: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: { xs: "row", sm: "column" },
              minHeight: { xs: "50px", md: "200px" },
            }}
          >
            <Item>
              <Typography>Count {count}</Typography>
            </Item>
            <Item>
              <Typography>Amount {totalAmount}</Typography>
            </Item>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Music;
