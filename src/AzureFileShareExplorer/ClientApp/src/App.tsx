import React, { useState } from 'react';
import './App.scss';
import { getData } from './mockData';
import { TreeElement, ElementType } from './models/treeElement';

const displayElement = (e: TreeElement, onNavigation: (location: string) => void): JSX.Element => {
  const isFolder = e.type === ElementType.Folder;
  let dblClick: (() => void) | undefined = undefined;
  if (isFolder) {
    dblClick = () => onNavigation(e.name);
  } else {
    dblClick = () => alert("plz open file");
  }

  return (
    <div key={e.type + e.name} className="tree-element" tabIndex={-1} onDoubleClick={dblClick}>
      <i className="fas fa-folder" /> {e.name}
    </div>
  );
}

const App: React.FC = () => {
  const [location, setLocation] = useState("");
  const data = getData(location);

  console.log(`Location: ${location}`);

  return (
    <div className="container">
      <header className="App-header">
        <h1>Azure File Share Explorer</h1>
        <div className="share-location">
          {location}
        </div>
      </header>
      <div>
        {data.map((e) => displayElement(e, (l: string) => setLocation(location + "/" + l)))}
      </div>
    </div>
  );
}

export default App;
