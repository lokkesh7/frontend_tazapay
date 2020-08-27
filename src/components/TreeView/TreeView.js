import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";

import TreeItem from './TreeItem'
import {LessIcon,MoreIcon,InterIcon} from './Icons'


const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const StyledTreeView = ({treeData, onSelectedNode}) => {
  const classes = useStyles();

  const renderTreeItem = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTreeItem(node)) : null}
    </TreeItem>
  );

  const onNodeChange = nodeId => {
    const [parentNodeID, childNodeIdx] = nodeId.split('-')

    if(childNodeIdx) {
      onSelectedNode(parentNodeID, childNodeIdx)
    }
  }

  return (
    <TreeView
      className={classes.root}
      onNodeSelect={(_, value) => onNodeChange(value)}
      defaultExpanded={[treeData.id]}
      defaultCollapseIcon={<LessIcon />}
      defaultExpandIcon={<MoreIcon />}
      defaultEndIcon={<InterIcon />}
    >
      {renderTreeItem(treeData)}
    </TreeView>
  );
};

export default StyledTreeView;
