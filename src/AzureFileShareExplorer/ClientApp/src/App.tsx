import React from 'react';
import { Route, Switch } from 'react-router';
import AuthorizeRoute from './components/authorization/AuthorizeRoute';
import SignedOut from './components/authorization/SignedOut';
import Layout from './components/Layout';
import FileExplorer from './components/FileExplorer';

const App: React.FC = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/signedout" component={SignedOut} />
                <AuthorizeRoute path="/" component={FileExplorer} />
            </Switch>
        </Layout>
    );
}

export default App;
