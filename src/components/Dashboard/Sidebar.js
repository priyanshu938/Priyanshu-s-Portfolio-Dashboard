import React, { useState } from "react";
import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Content from "./Content";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import {
  Box,
  List,
  Toolbar,
  CssBaseline,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import LogoutIcon from "@mui/icons-material/Logout";
import MessageIcon from "@mui/icons-material/Message";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import EmailIcon from "@mui/icons-material/Email";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import Switch from "@mui/material/Switch";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export default function Sidebar2({
  content,
  setContent,
  darkMode,
  setDarkMode,
}) {
  let navigate = useNavigate();
  const theme = useTheme();

  const [open, setOpen] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  //to add any new section, just add that name in contentArray and add the icon in contentIcon object
  const contentArray = [
    "about-me",
    "chatbot",
    "compose-email",
    "skills",
    "projects",
    "certificates",
    "videos",
    "work experience",
    "messages",
  ];
  const contentIcon = {
    "about-me": <CoPresentIcon />,
    chatbot: <SmartToyOutlinedIcon />,
    "compose-email": <EmailIcon />,
    skills: <AccessibilityIcon />,
    projects: <ArchitectureIcon />,
    certificates: <AssignmentIcon />,
    videos: <VideoLibraryIcon />,
    "work experience": <AssuredWorkloadIcon />,
    messages: <MessageIcon />,
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleLogOut = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to logout from the Dashboard?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            No
          </Button>
          <Button onClick={handleLogOut}>Yes</Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography px={2} mt={1} variant="h6" component="div" gutterBottom>
              {content.toUpperCase()}
            </Typography>
            <MaterialUISwitch
              sx={{ m: 1 }}
              defaultChecked
              theme={theme}
              onChange={() => setDarkMode(!darkMode)}
            />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <Typography px={2} variant="h6" component="div" gutterBottom>
                <FlutterDashIcon />
                My Dashboard
              </Typography>
            </IconButton>
          </DrawerHeader>
          <Divider />
          {contentArray.map((item) => (
            <List>
              <ListItem
                disablePadding
                onClick={() => setContent(item)}
                style={{
                  backgroundColor: content === item && "#1976D2",
                  borderRadius: "5px",
                  color: content === item && "white",
                }}
              >
                <ListItemButton>
                  <Tooltip
                    title={item}
                    placement="bottom"
                    TransitionComponent={Zoom}
                  >
                    <ListItemIcon
                      style={{
                        color: content === item && "white",
                      }}
                    >
                      {contentIcon[item]}
                    </ListItemIcon>
                  </Tooltip>
                  <ListItemText
                    primary={item.charAt(0).toUpperCase() + item.slice(1)}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          ))}

          {
            //Logout
          }
          <List onClick={handleOpenDialog}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Tooltip
                    title="logout"
                    placement="bottom"
                    TransitionComponent={Zoom}
                  >
                    <LogoutIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Content content={content} setContent={setContent} />
        </Box>
      </Box>
    </div>
  );
}
