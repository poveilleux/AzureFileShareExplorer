import React from 'react';
import AuthorizeRoute from './components/authorization/AuthorizeRoute';
import Layout from './components/Layout';
import FileExplorer from './components/FileExplorer';

const App: React.FC = () => {
    return (
        <Layout>
            <AuthorizeRoute path="/" component={FileExplorer} />
        </Layout>
    );
}

export default App;
