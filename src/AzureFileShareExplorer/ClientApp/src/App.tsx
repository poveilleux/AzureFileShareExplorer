import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import FileExplorer from './components/FileExplorer';

const App: React.FC = () => {
    return (
        <Layout>
            <Route path="/" component={FileExplorer} />
        </Layout>
    );
}

export default App;
