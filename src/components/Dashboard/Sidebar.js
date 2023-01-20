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

export default function Sidebar2({ content, setContent }) {
  let navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const contentArray = [
    "about-me",
    "chatbot",
    "compose-email",
    "skills",
    "projects",
    "certificates",
    "videos",
    "works",
    "contact",
  ];
  const contentIcon = {
    "about-me": <CoPresentIcon />,
    chatbot: <SmartToyOutlinedIcon />,
    "compose-email": <EmailIcon />,
    skills: <AccessibilityIcon />,
    projects: <ArchitectureIcon />,
    certificates: <AssignmentIcon />,
    videos: <VideoLibraryIcon />,
    works: <AssuredWorkloadIcon />,
    contact: <MessageIcon />,
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
