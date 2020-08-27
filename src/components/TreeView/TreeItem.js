import React from "react";
import TreeItem from "@material-ui/lab/TreeItem";
import { makeStyles, fade } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  iconContainer: {
    "& .close": {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}));

const StyledTreeItem = (props) => {
  const classes = useStyles();
  return (
    <TreeItem
      classes={{ iconContainer: classes.iconContainer, group: classes.group }}
      {...props}
    />
  );
};

export default StyledTreeItem;
