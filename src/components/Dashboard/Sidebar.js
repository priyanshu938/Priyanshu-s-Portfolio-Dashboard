import React, { useState } from "react";
import {
  Box,
  List,
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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const Sidebar = ({ setIsLoggedIn, content, setContent }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLogOut = () => {
    setIsLoggedIn(false);
  };
  return (
    <div style={{ backgroundColor: "#FFFAFA", height: "100vh" }}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to logout from the Dashboard?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
          <Button onClick={handleLogOut}>Yes</Button>
        </DialogActions>
      </Dialog>
      <Box
        flex={1}
        sx={{ display: { xs: "none", sm: "block" } }}
        style={{ cursor: "pointer", paddingTop: "30px" }}
      >
        <Typography px={2} variant="h6" component="div" gutterBottom>
          <FlutterDashIcon />
          My Dashboard
        </Typography>
        {
          // My Skills
        }
        <List>
          <ListItem
            disablePadding
            onClick={() => setContent("skills")}
            style={{
              backgroundColor: content === "skills" && "skyblue",
              borderRadius: "5px",
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <AccessibilityIcon />
              </ListItemIcon>
              <ListItemText primary="My Skills" />
            </ListItemButton>
          </ListItem>
        </List>
        {
          //My Projects
        }
        <List>
          <ListItem
            disablePadding
            onClick={() => setContent("projects")}
            style={{
              backgroundColor: content === "projects" && "skyblue",
              borderRadius: "5px",
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <ArchitectureIcon />
              </ListItemIcon>
              <ListItemText primary="My Projects" />
            </ListItemButton>
          </ListItem>
        </List>

        {
          //My Certificates
        }
        <List>
          <ListItem
            disablePadding
            onClick={() => setContent("certificates")}
            style={{
              backgroundColor: content === "certificates" && "skyblue",
              borderRadius: "5px",
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="My Certificates" />
            </ListItemButton>
          </ListItem>
        </List>
        {
          //My Work Experience
        }
        <List>
          <ListItem
            disablePadding
            onClick={() => setContent("works")}
            style={{
              backgroundColor: content === "works" && "skyblue",
              borderRadius: "5px",
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <AssuredWorkloadIcon />
              </ListItemIcon>
              <ListItemText primary="Work Experience" />
            </ListItemButton>
          </ListItem>
        </List>
        {
          //My Resume
        }
        <List>
          <ListItem
            disablePadding
            onClick={() => setContent("resume")}
            style={{
              backgroundColor: content === "resume" && "skyblue",
              borderRadius: "5px",
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <CoPresentIcon />
              </ListItemIcon>
              <ListItemText primary="My Resume" />
            </ListItemButton>
          </ListItem>
        </List>
        {
          //Logout
        }
        <List onClick={handleClickOpen}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );
};

export default Sidebar;
