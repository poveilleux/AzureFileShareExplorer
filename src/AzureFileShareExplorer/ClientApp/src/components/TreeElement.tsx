import React from 'react';
import { TreeElementModel, ElementType } from '../models/treeElementModel';

interface TreeElementProps {
    element: TreeElementModel;
    onDoubleClick: (element: TreeElementModel) => void;
}

function getIcon(element: TreeElementModel): JSX.Element {
    if (element.type === ElementType.Folder) {
        return <i className="fas fa-folder" />;
    } else if (element.name.endsWith(".png")) {
        return <i className="fas fa-file-image" />;
    }
    
    return <i className="fas fa-file" />;
}

const TreeElement: React.SFC<TreeElementProps> = (props) => {
    return (
        <div className="tree-element" tabIndex={-1} onDoubleClick={() => props.onDoubleClick(props.element)}>
            {getIcon(props.element)} {props.element.name}
        </div>
    );
};

export default TreeElement;