import React from 'react';
import './App.scss';
import { getData } from './mockData';
import { TreeElement } from './models/treeElement';

const displayElement = (e: TreeElement): JSX.Element => {
  return (
    <div>
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
