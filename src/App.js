import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Header from "./components/Header";
import SideBar from "./components/Sidebar";
import TreeView from "./components/TreeView/TreeView";
import Content from "./components/Content";

import "./App.css";

import Services from "./Services";

const sideBarWidth = 150;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

function App() {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [courseData, setCourseData] = React.useState({
    sections: {
      name: "Sections",
      id: "qwerty123",
      children: [],
    },
    lessons: {},
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getLessonData = (courseID) => Services.fetchLessonData(courseID);

  const getLessonContent = async (sectionID, lessonIdx) => {
    const sectionData = courseData.sections.children.filter(
      (section) => section.id === sectionID
    )[0];
    const sectionName = sectionData.name;
    const lessonName = sectionData.children[lessonIdx - 1].name;
    let response = await getLessonData({ sectionName, lessonName });
    console.log(response);
    if (!response.data.length) {
      response = await getLessonData({ lessonName });
    }
    setCourseData((prevState) => {
      return {
        ...prevState,
        lessons:
          Boolean(prevState.lessons.Content) && response.data.length
            ? {  ...response.data[0] }
            : {
                Content: `<div><h4>Oops! The requested lesson is Not available right now.</h4><p>Please choose a different lesson to start Learning!!!</p></div>`,
              },
      };
    });
  };

  React.useEffect(() => {
    Services.fetchCourseTopics().then((res) => {
      const newSectionChildren = [];
      res.data.forEach(({ name, id, children }) => {
        newSectionChildren.push({
          name,
          id,
          children: children.map((child, cdx) => ({
            name: child,
            id: `${id}-${cdx + 1}`,
          })),
        });
      });
      setCourseData((prevState) => ({
        ...prevState,
        sections: { ...prevState.sections, children: [...newSectionChildren] },
      }));
    });
  }, []);

  return (
    <div className="App">
      <div className={classes.root}>
        <Header width={sideBarWidth} onClick={handleDrawerToggle} />
        <SideBar
          width={sideBarWidth}
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >
          <TreeView
            treeData={courseData.sections}
            onSelectedNode={getLessonContent}
          />
        </SideBar>
        <Content>{courseData.lessons.Content}</Content>
      </div>
    </div>
  );
}

export default App;
