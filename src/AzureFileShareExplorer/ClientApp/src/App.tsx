import React, { useState } from 'react';
import './App.scss';
import { getData } from './mockData';
import TreeElement from './components/TreeElement';
import { TreeElementModel, ElementType } from './models/treeElementModel';

const App: React.FC = () => {
    const [location, setLocation] = useState("/");
    const data = getData(location);

    function navigate(element: TreeElementModel) {
        if (element.type === ElementType.Folder) {
            setLocation(location + element.name + "/");
        }
    }

    return (
        <div className="container">
            <header className="App-header">
                <h1>Azure File Share Explorer</h1>
                <div className="share-location">
                    {location}
                </div>
            </header>
            <div>
                {data.map((e) => <TreeElement element={e} onDoubleClick={navigate} />)}
            </div>
        </div>
    );
}

export default App;
