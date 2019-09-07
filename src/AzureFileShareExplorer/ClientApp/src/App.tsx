import React from 'react';
import './App.scss';
import { getData } from './mockData';
import { TreeElement, ElementType } from './models/treeElement';

const displayElement = (e: TreeElement): JSX.Element => {
  const isFolder = e.type === ElementType.Folder;
  let dblClick: (() => void) | undefined = undefined;
  if (isFolder) {
    dblClick = () => alert("Open folder plz.");
  }

  return (
    <div key={e.type + e.name} className="tree-element" tabIndex={-1} onDoubleClick={dblClick}>
      <i className="fas fa-folder" /> {e.name}
    </div>
  );
}

const App: React.FC = () => {
  const data = getData();

  return (
    <div className="container">
      <header className="App-header">
        <h1>Azure File Share Explorer</h1>
      </header>
      <div>
        {data.map(displayElement)}
      </div>
    </div>
  );
}

export default App;
