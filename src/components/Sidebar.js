import React from "react";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sidebar: (width) => ({
    [theme.breakpoints.up("sm")]: {
      width,
      flexShrink: 0,
    },
  }),
  sidebarBase: (width) => ({
    width,
  }),
}));

const Sidebar = ({ width, children, open, onClose }) => {
  const classes = useStyles(width);

  return (
    <nav className={classes.sidebar} aria-label="tree_view">
      <Hidden smUp>
        <Drawer
          open={open}
          onClose={onClose}
          classes={{
            paper: classes.sidebarBase,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div style={{ padding: "16px" }}>{children}</div>
        </Drawer>
      </Hidden>
      <Hidden xsDown>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <div style={{ padding: "16px" }}>{children}</div>
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default Sidebar;
