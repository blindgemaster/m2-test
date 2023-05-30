import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Inbox, Mail, KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 0,
    marginBottom: 0,
    transition: "margin-left 0.2s ease",
  },
  buttonContainerOpen: {
    marginLeft: 180,
  },
  button: {
    minWidth: 0,
    padding: 4,
    marginRight: 8,
  },
});

const SidePanel = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false); // State to track sidebar visibility
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to track popup visibility
  const navigate = useNavigate();

  // Event handler to toggle the sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Event handler to open the popup
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // Event handler to close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Event handler for navigating to the home page
  const goToHomePage = () => {
    navigate("/account");
  };

  return (
    <>
      {/* Button container */}
      <div className={`${classes.buttonContainer} ${isOpen ? classes.buttonContainerOpen : ""}`}>
        {/* Button to toggle the sidebar */}
        <Button
          onClick={toggleSidebar}
          variant="contained"
          size="small"
          endIcon={isOpen ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          className={`${classes.button} ${isOpen ? classes.buttonOpen : ""}`}
        >
          {isOpen ? "" : ""}
        </Button>
      </div>

      {/* Sidebar */}
      <Drawer variant="persistent" anchor="left" open={isOpen} className={classes.drawer}>
        <List>
          <ListItem button onClick={goToHomePage}>
            <ListItemIcon>
              <Inbox />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={openPopup}>
            <ListItemIcon>
              <Mail />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
        </List>
      </Drawer>

      {/* Popup */}
      <Dialog open={isPopupOpen} onClose={closePopup}>
        <DialogTitle>Messages</DialogTitle>
        <DialogContent>
          {/* Render the inbox and new message content here */}
          <p>Inbox</p>
          <p>New Message</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePopup}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SidePanel;

