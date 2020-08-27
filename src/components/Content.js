import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import './content.css'

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

const Content = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      {
        children ? <div dangerouslySetInnerHTML={{__html: children}} /> : (
          <div>
            <h4>Welcome to TechSchool Courses</h4>
            <p>Please choose a lesson to start Learning!!!</p>
          </div>
        )
      }
    </div>
  );
};

export default Content;
