import React, { useCallback } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Paper from "@mui/material/Paper";

export default function SimpleBottomNavigation() {
  const router = useRouter();
  const [value, setValue] = React.useState(0);

  const handleClickReset = useCallback(() => {
    console.log("click!");
    localStorage.removeItem("birthday");
    localStorage.removeItem("name");
    localStorage.removeItem("sex");

    router.replace("/MainPage");
  }, []);
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <Box sx={{ width: "100%" }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            console.log(newValue)
          }}
        >
          <BottomNavigationAction
            onClick={() => {console.log('?')}}
            label="reset"
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Box>
    </Paper>
  );
}
