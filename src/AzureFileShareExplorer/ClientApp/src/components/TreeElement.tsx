import React from "react";

import "src/components/TreeElement.scss";
import { TreeElementModel, FileElementModel } from "src/models/treeElementModel";

interface TreeElementProps {
    element: TreeElementModel;
    onDoubleClick: (element: TreeElementModel) => void;
}

function getIcon(element: TreeElementModel): JSX.Element {
  if (element.isFolder()) {
    return <i className="fas fa-folder" />;
  } else if (element.isFile()) {
    const file = element as FileElementModel;
    if (file.isImage()) {
      return <i className="far fa-file-image" />;
    } else if (file.isText()) {
      return <i className="far fa-file-alt" />;
    }
  }

  return <i className="far fa-file" />;
}

const TreeElement: React.FC<TreeElementProps> = (props: TreeElementProps) => {
  return (
    <div className="tree-element" tabIndex={-1} onDoubleClick={(): void => props.onDoubleClick(props.element)}>
      {getIcon(props.element)} {props.element.name}
    </div>
  );
};

export default TreeElement;
