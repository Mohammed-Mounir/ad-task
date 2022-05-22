import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { pink } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

import { cartActions } from "../../store/cartSlice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Albums = () => {
  const { music } = useSelector((state) => state.music);
  const { selectedAlbums } = useSelector((state) => state.cart);
  const [albums, setAlbums] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setAlbums(
      music
        .filter((singer) => singer.isChecked)
        .map((singer) => singer.albums)
        .flat()
    );
  }, [music]);

  const isAlbumSelected = (albumTitle) =>
    selectedAlbums.some((selectedAlbum) => selectedAlbum.title === albumTitle);

  const toggleAlbumHandler = (album) => {
    dispatch(cartActions.toggleAlbums(album));
  };

  return (
    <Stack direction="row" spacing={1}>
      {albums.map((album) => {
        return (
          <Item key={album.title} variant="outlined">
            <Checkbox
              onClick={() => toggleAlbumHandler(album)}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleOutlineIcon />}
              checked={isAlbumSelected(album.title)}
              sx={{
                color: pink[800],
                "&.Mui-checked": {
                  color: pink[600],
                },
              }}
            />
            {album.title}
          </Item>
        );
      })}
    </Stack>
  );
};

export default Albums;
