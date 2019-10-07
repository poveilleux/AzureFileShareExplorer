import React, { useState } from 'react';
import { getData } from '../mockData';
import TreeElement from './TreeElement';
import { TreeElementModel } from '../models/treeElementModel';
import NavigationBar from './NavigationBar';
import { RouteComponentProps } from 'react-router';

const FileExplorer: React.SFC<RouteComponentProps> = (props) => {
    const [location, setLocation] = useState<string[]>([]);
    const data = getData(location);

    // TODO: Read from props and set location to browser.
    console.log(props.location.pathname);

    function navigate(element: TreeElementModel) {
        if (element.isFolder()) {
            setLocation([ ...location, element.name ]);
        }
    }

    return (
        <div className="container">
            <header className="App-header">
                <h1>Azure File Share Explorer</h1>
                <NavigationBar location={location} navigateTo={l => setLocation(l)} />
            </header>
            <div>
                {data.map((e) => <TreeElement key={e.name} element={e} onDoubleClick={navigate} />)}
            </div>
        </div>
    );
}

export default FileExplorer;
