import React, { useState } from 'react';
import './App.scss';
import { getData } from './mockData';
import TreeElement from './components/TreeElement';
import { TreeElementModel } from './models/treeElementModel';
import Navigation from './components/Navigation';

const App: React.FC = () => {
    const [location, setLocation] = useState<string[]>([]);
    const data = getData(location);

    function navigate(element: TreeElementModel) {
        if (element.isFolder()) {
            setLocation([ ...location, element.name ]);
        }
    }

    return (
        <div className="container">
            <header className="App-header">
                <h1>Azure File Share Explorer</h1>
                <Navigation location={location} navigateTo={l => setLocation(l)} />
            </header>
            <div>
                {data.map((e) => <TreeElement key={e.name} element={e} onDoubleClick={navigate} />)}
            </div>
        </div>
    );
}

export default App;
