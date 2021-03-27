import React from "react";
import { Route, Switch } from "react-router";

import AuthorizeRoute from "src/components/authorization/AuthorizeRoute";
import SignedOut from "src/components/authorization/SignedOut";
import Layout from "src/components/Layout";
import FileExplorer from "src/components/FileExplorer";

const App: React.FC = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/signedout" component={SignedOut} />
        <AuthorizeRoute path="/" component={FileExplorer} />
      </Switch>
    </Layout>
  );
};

export default App;
