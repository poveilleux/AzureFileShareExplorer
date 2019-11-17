import React from 'react';
import { Route } from 'react-router';
import AuthorizeRoute from './components/authorization/AuthorizeRoute';
import SignedOut from './components/authorization/SignedOut';
import Layout from './components/Layout';
import FileExplorer from './components/FileExplorer';

const App: React.FC = () => {
    return (
        <Layout>
            <Route path="/signedout" component={SignedOut} />
            <AuthorizeRoute exact path="/" component={FileExplorer} />
        </Layout>
    );
}

export default App;
