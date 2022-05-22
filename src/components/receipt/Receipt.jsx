import { useSelector } from "react-redux";

import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Box, Paper } from "@mui/material";

const Receipt = () => {
  const { order } = useSelector((state) => state.cart);

  return (
    <Box sx={{ mt: -2 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontSize: { xs: 16, md: 24 } }}
      >
        Thank you {order?.userName} for your order.
      </Typography>
      <Typography variant="subtitle1" sx={{ fontSize: { xs: 14, md: 16 } }}>
        Your order number is #{order?.id}. We have emailed you at (
        {order?.email}), with your order confirmation, and will send you an
        update when your order has shipped.
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flext-start",
          gap: "10px",
          p: 1,
          mt: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontSize: { xs: 16, md: 20 } }}>
            Your choice of music
          </Typography>
          <Paper
            variant="outlined"
            sx={{ maxHeight: "100px", overflow: "auto" }}
          >
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {order.songs.map((song) => (
                <ListItem key={song.title}>
                  <ListItemText
                    primary={song.title}
                    secondary={`${song.price} EGP`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
        <Box sx={{ p: 1, textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontSize: { xs: 16, md: 20 } }}>
            Total Amount
          </Typography>
          <Box>{order.totalAmount} EGP</Box>
        </Box>
        <Box sx={{ p: 1, textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontSize: { xs: 16, md: 20 } }}>
            Total Songs
          </Typography>
          <Box>{order.count}</Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Receipt;
