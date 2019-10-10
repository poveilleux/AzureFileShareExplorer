import React, { useState } from 'react';
import { getData } from '../mockData';
import TreeElement from './TreeElement';
import { TreeElementModel } from '../models/treeElementModel';
import NavigationBar from './NavigationBar';
import { RouteComponentProps } from 'react-router';
import useReactRouter from 'use-react-router';

const FileExplorer: React.FC = () => {
    const { history, location } = useReactRouter();

    console.log(location.pathname.split('/'));
    const currentLocation = decodeURIComponent(location.pathname).split('/').filter(x => x);
    console.log(`currentLocation: ${currentLocation}`);

    //const [location, setLocation] = useState<string[]>(initialLocation);
    const data = getData(currentLocation);

    // TODO: Read from props and set location to browser.
    //console.log(props.location.pathname);

    function navigate(element: TreeElementModel) {
        if (element.isFolder()) {
            const newLocation = (location.pathname + "/" + encodeURIComponent(element.name)).replace("//", "/");
            console.log(location);
            console.log(newLocation);
            history.push(newLocation);
            // props.history.push("/" + [...location, element.name].join("/"));
            //setLocation([ ...location, element.name ]);
        }
    }

    return (
        <div className="container">
            <header className="App-header">
                <h1>Azure File Share Explorer</h1>
                <NavigationBar location={location} /*navigateTo={l => setLocation(l)}*/ />
            </header>
            <div>
                {data.map((e) => <TreeElement key={e.name} element={e} onDoubleClick={navigate} />)}
            </div>
        </div>
    );
}

export default FileExplorer;
