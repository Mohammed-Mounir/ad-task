import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { cartActions } from "../../store/cartSlice";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { pink } from "@mui/material/colors";

const Songs = () => {
  const { music } = useSelector((state) => state.music);
  const { selectedSongs } = useSelector((state) => state.cart);
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

  const isSongSelected = (songTitle) =>
    selectedSongs.some((selectedSong) => selectedSong.title === songTitle);

  const toggleSongHandler = (song) => {
    dispatch(cartActions.toggleSongs(song));
  };

  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        gap: "5px",
        alignItems: "stretch",
        justifyContent: "center",
      }}
    >
      {albums.length ? (
        albums.map((album) => (
          <Card
            key={album.title}
            variant="outlined"
            sx={{
              width: "50%",
            }}
          >
            <CardContent sx={{ m: 0, p: 1 }}>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                textAlign="center"
              >
                {album.title}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                p: 0,
              }}
            >
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  maxHeight: 150,
                  overflow: "auto",
                  bgcolor: "background.paper",
                  textAlign: "center",
                  p: 0,
                }}
              >
                {album.songs.map((song) => {
                  const labelId = `checkbox-list-label-${song.title}`;

                  return (
                    <ListItem key={song.title} disablePadding>
                      <ListItemButton
                        role={undefined}
                        onClick={() => toggleSongHandler(song)}
                        dense
                      >
                        <ListItemIcon sx={{ minWidth: "5%" }}>
                          <Checkbox
                            edge="start"
                            checked={isSongSelected(song.title)}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ "aria-labelledby": labelId }}
                            sx={{
                              color: pink[800],
                              "&.Mui-checked": {
                                color: pink[600],
                              },
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          id={labelId}
                          primary={song.title}
                          sx={{
                            fontSize: 12,
                          }}
                          disableTypography
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
};

export default Songs;
