# BCGov SSO Keycloak Frontend Integration

[![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999)](Redirect-URL)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

[![NodeJS](https://img.shields.io/badge/Node.js_18-43853D?style=for-the-badge&logo=node.js&logoColor=white)](NodeJS)
[![Typescript](https://img.shields.io/badge/TypeScript_5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](Typescript)
[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](React)

<br />

## Table of Contents

- [General Information](#general-information)
- [Getting Started with the Integration](#getting-started-with-the-integration) - Start Here!
- [Module Exports](#module-exports) - Functions and Types available from the module.
- [Authentication Flow](#authentication-flow) - How it works from login button click.

## General Information

- For React:18 on NodeJS:18
- For Keycloak Gold Standard.
- Works with Vanilla JavaScript or Typescript 5.
- Currenly requires a proxy pass to the api with `/api`.
- For use with [@bcgov/keycloak-express]

<br />

## Getting Started with the Integration

1. Add the following line to your frontend `package.json` under `"dependencies":`:

```JSON
"@bcgov/keycloak-react": "https://github.com/bcgov/keycloak-react/releases/download/v1.0.0-alpha.1/bcgov-keycloak-react.tgz",
```

2. Add import `import { KeycloakProvider } from '@bcgov/keycloak-react';` to `main.tsx` file or wherever the `createRoot()` function is. Wrap `<KeycloakProvider>` component around the Router or Routes like shown below:

```JavaScript
import { KeycloakProvider } from '@bcgov/keycloak-react'; // <--------------------------------------
import { ThemeProvider } from '@mui/material';
import AppRouter from 'AppRouter';
import React from 'react';
import { createRoot } from 'react-dom/client';
import theme from 'theme';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <KeycloakProvider> // <--------------------------------------
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </KeycloakProvider> // <--------------------------------------
  </React.StrictMode>,
);
```

3. Add import `import { KeycloakWrapper } from '@bcgov/keycloak-react';` to `AppRouter.tsx` file or wherever your routes are defined. Wrap `<KeycloakWrapper>` around Routes inside of Router like this example using `react-router-dom`:

```JavaScript
<Router>
  <KeycloakWrapper> // <--------------------------------------
    <Header />
    <Routes>
      <Route
        path="/"
        element={<h1>Home</h1>}
      />
    </Routes>
    <Footer />
  </KeycloakWrapper> // <--------------------------------------
</Router>
```

4. Use the following example to implement a login and logout button.

```JavaScript
import { useAuthService } from '@bcgov/keycloak-react'; 

const HomePage = () => {
  // state is aliased as authState
  const { state: authState, getLoginURL, getLogoutURL } = useAuthService(); 
  const user = authState.userInfo; 

  return (
    <>
      {user ? (
        <>
          <p>
            Logged in as User: {user.given_name} {user.family_name}
          </p>
          <button onClick={() => (window.location.href = getLogoutURL())}>Logout</button>
        </>
      ) : (
        <button onClick={() => (window.location.href = getLoginURL())}>Login with IDIR</button>
      )}
    </>
  );
};
```

<br />

For all user properties reference [SSO Keycloak Wiki - Identity Provider Attribute Mapping].  
Example IDIR `state.userInfo` object:

```JSON
{
  "idir_user_guid": "W7802F34D2390EFA9E7JK15923770279",
  "identity_provider": "idir",
  "idir_username": "JOHNDOE",
  "name": "Doe, John CITZ:EX",
  "preferred_username": "a7254c34i2755fea9e7ed15918356158@idir",
  "given_name": "John",
  "display_name": "Doe, John CITZ:EX",
  "family_name": "Doe",
  "email": "john.doe@gov.bc.ca",
  "client_roles": ["admin"]
}
```

[Return to Top](#bcgov-sso-keycloak-frontend-integration)

<br />

## Module Exports

These are the functions and types exported by the `@bcgov/keycloak-react` module.

```JavaScript
import {
  KeycloakWrapper, // Provides the login and refresh token functionality.
  KeycloakProvider, // Provides state management for Keycloak.
  useAuthState, // See below for usage.
  AuthContext, // Shouldn't need to be used in your code.
} from '@bcgov/keycloak-react';

// Use the useAuthState() hook within a React component:
const {
  state, // Access the current user with state.userInfo
  getLoginURL, // Returns the login route.
  getLogoutURL, // Returns the logout route.
  hasRole, // Pass a role in the form of a string to tell if the user has the given client_role.
  setUserInfo, // Shouldn't need to be used in your code.
  refreshAccessToken, // Shouldn't need to be used in your code.
} = useAuthService();

// Typescript Types - these shouldn't need to be used in your code.
import {
  AuthStateWithDispatch,
  AuthActionType,
  AuthState,
  AuthAction,
} from '@bcgov/keycloak-react';
```

[Return to Top](#bcgov-sso-keycloak-frontend-integration)

<br/>

## Authentication Flow

The Keycloak Authentication system begins when the user visits the frontend application.

1. The user visits the frontend of the application. Here, the `KeycloakWrapper` component initializes and checks the URL for a query parameter named `token`.

- If the `token` query parameter is found:

  - The component strips the URL of the access token.
  - The user's information is set into the state using the token.
  - The user can now access the frontend of the application.

- If the `token` query parameter is not found, the component checks if the user is logged in by using the refresh token to get a new access token by communicating with the `/api/oauth/token` endpoint.
  - If the refresh token exists and is valid, the user can now access the frontend of the application without seeing the login button, as their session is authenticated through the refresh token.
  - If the refresh token doesn't exist or is invalid, the login button is displayed.

2. When the user clicks the login button, they are routed to the `/api/oauth/login` endpoint via a proxy pass, which then redirects them to the Keycloak login page.

3. Upon successful login at the Keycloak login page, Keycloak redirects the user to the `/oauth/login/callback` endpoint.

4. The authentication code returned by the callback endpoint is used to retrieve the access token and the refresh token for the user.

5. The user is redirected back to the frontend with the access token included as a `token` query parameter and the refresh token set as an httpOnly cookie.

6. The `KeycloakWrapper` component re-initiates and the process repeats from step 1, this time with the `token` query parameter available.

<img width="100%" src="https://github.com/bcgov/keycloak-react/assets/16313579/08c5d42a-b08a-46db-9e13-157417b6df3c">

[Return to Top](#bcgov-sso-keycloak-frontend-integration)

<!-- Link References -->

[access token]: https://auth0.com/docs/secure/tokens/access-tokens
[refresh token]: https://developer.okta.com/docs/guides/refresh-tokens/main/
[@bcgov/keycloak-express]: https://github.com/bcgov/keycloak-express
[SSO Keycloak Wiki - Identity Provider Attribute Mapping]: https://github.com/bcgov/sso-keycloak/wiki/Identity-Provider-Attribute-Mapping
