import React from 'react';
import { getData } from '../mockData';
import TreeElement from './TreeElement';
import { appendToLocation } from '../helpers/locationHelpers';
import { TreeElementModel } from '../models/treeElementModel';
import NavigationBar from './NavigationBar';
import useReactRouter from 'use-react-router';

const FileExplorer: React.FC = () => {
    const { history, location } = useReactRouter();

    const currentLocation = decodeURIComponent(location.pathname);

    const data = getData(currentLocation);

    function navigate(element: TreeElementModel) {
        if (element.isFolder()) {
            const newLocation = appendToLocation(location.pathname, element.name);
            history.push(newLocation);
        }
    }

    return (
        <div className="container">
            <header className="App-header">
                <h1>Azure File Share Explorer</h1>
                <NavigationBar location={currentLocation} navigateTo={l => history.push(l)} />
            </header>
            <div>
                {data.map((e) => <TreeElement key={e.name} element={e} onDoubleClick={navigate} />)}
            </div>
        </div>
    );
}

export default FileExplorer;
