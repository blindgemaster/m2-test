import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Button } from "@mui/material";
import { Inbox, Mail, KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";

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

  // Event handler to toggle the sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Button container */}
      <div
        className={`${classes.buttonContainer} ${isOpen ? classes.buttonContainerOpen : ""}`}
      >
        {/* Button to toggle the sidebar */}
        <Button
          onClick={toggleSidebar}
          variant="contained"
          size="small"
          endIcon={isOpen ? <KeyboardArrowLeft /> : <KeyboardArrowRight />} // Change icon based on sidebar state
          className={`${classes.button} ${isOpen ? classes.buttonOpen : ""}`} // Apply additional class when sidebar is open
        >
          {isOpen ? "" : ""} {/* Change button text based on sidebar state */}
        </Button>
      </div>

      {/* Sidebar */}
      <Drawer variant="persistent" anchor="left" open={isOpen} className={classes.drawer}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <Inbox />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Mail />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default SidePanel;





