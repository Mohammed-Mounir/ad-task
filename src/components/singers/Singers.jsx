import { useSelector, useDispatch } from "react-redux";

import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { pink } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

import { musicActions } from "../../store/musicSlice";
import { cartActions } from "../../store/cartSlice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Singers = () => {
  const { music } = useSelector((state) => state.music);
  const dispatch = useDispatch();

  const toggleSingerHandler = (currentSinger) => {
    dispatch(musicActions.toggleSingerStatus(currentSinger));
    dispatch(cartActions.toggleSinger(currentSinger));
  };

  return (
    <Stack direction="row" spacing={2}>
      {music.map((singer) => {
        return (
          <Item key={singer.name} variant="outlined">
            <Checkbox
              onClick={() => toggleSingerHandler(singer)}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleOutlineIcon />}
              checked={singer.isChecked}
              sx={{
                color: pink[800],
                "&.Mui-checked": {
                  color: pink[600],
                },
              }}
            />
            {singer.name}
          </Item>
        );
      })}
    </Stack>
  );
};

export default Singers;
