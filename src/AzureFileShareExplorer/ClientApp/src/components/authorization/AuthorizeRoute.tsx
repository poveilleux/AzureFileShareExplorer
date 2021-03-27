import React from "react";
import { RouteProps, Route } from "react-router";

import authorizeService from "src/components/authorization/AuthorizeService";

interface AuthorizeRouteState {
    ready: boolean;
    authenticated: boolean;
}

export default class AuthorizeRoute extends React.Component<RouteProps, AuthorizeRouteState> {
    private _subscription: number | undefined;

    constructor(props: RouteProps) {
      super(props);

      this.state = {
        ready: false,
        authenticated: false
      };
    }

    componentDidMount(): void {
      this._subscription = authorizeService.subscribe(() => this.authenticationChanged());
      this.populateAuthenticationState();
    }

    componentWillUnmount(): void {
      if (this._subscription) {
        authorizeService.unsubscribe(this._subscription);
      }
    }

    render(): React.ReactNode {
      const { ready, authenticated } = this.state;
      const redirectUrl = `/user/challenge?returnUrl=${encodeURI(window.location.href)}`;

      if (!ready) {
        return <div></div>;
      } else {
        const { component, ...rest } = this.props;
        return (
          <Route {...rest}
            render={(props): React.ReactElement | undefined => {
              if (authenticated) {
                return React.createElement(component, props);
              } else {
                window.location.href = redirectUrl;
              }
            }} />
        );
      }
    }

    private async authenticationChanged(): Promise<void> {
      this.setState({ ready: false, authenticated: false });
      await this.populateAuthenticationState();
    }

    private async populateAuthenticationState(): Promise<void> {
      const authenticated = await authorizeService.isAuthenticated();
      this.setState({ ready: true, authenticated });
    }
}
