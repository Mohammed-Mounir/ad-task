import { useState, useId } from "react";

import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";

import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/material";

const isEmpty = (value) => value.trim() === "";
const isEmail = (email) => {
  const regexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(email);
};
const isPhoneNumber = (number) => {
  const regexp = /^0+[1-9][0-9]{9}$/;
  return regexp.test(number);
};

const SubmitRequest = ({ onSubmit }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const dispatch = useDispatch();
  const id = useId();

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "userName") setUserName(value);
    else if (name === "email") setEmail(value);
    else setMobile(value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setUserNameError(false);
    setEmailError(false);
    setMobileError(false);

    if (isEmpty(userName)) {
      setUserNameError(true);
    }

    if (isEmpty(email) || !isEmail(email)) {
      setEmailError(true);
    }

    if (isEmpty(mobile) || !isPhoneNumber(mobile)) {
      setMobileError(true);
    }

    dispatch(
      cartActions.addOrder({ id: `${id}${mobile}`, userName, email, mobile })
    );

    onSubmit();
  };

  return (
    <Container>
      <form onSubmit={submitHandler}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <TextField
            size="small"
            value={userName}
            name="userName"
            onChange={inputChangeHandler}
            label="Name"
            variant="outlined"
            color="secondary"
            required
            error={userNameError}
          />
          <TextField
            size="small"
            value={email}
            name="email"
            onChange={inputChangeHandler}
            label="Email"
            variant="outlined"
            color="secondary"
            required
            error={emailError}
          />
          <TextField
            size="small"
            value={mobile}
            name="mobile"
            onChange={inputChangeHandler}
            label="Mobile"
            variant="outlined"
            color="secondary"
            required
            error={mobileError}
          />
          <Button
            variant="contained"
            sx={{
              mt: 1,
            }}
            endIcon={<SendIcon />}
            type="submit"
            color="secondary"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default SubmitRequest;
