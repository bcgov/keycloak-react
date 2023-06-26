# BCGov SSO Keycloak Frontend Integration

[![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999)](Redirect-URL)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

[![NodeJS](https://img.shields.io/badge/Node.js_18-43853D?style=for-the-badge&logo=node.js&logoColor=white)](NodeJS)
[![Typescript](https://img.shields.io/badge/TypeScript_5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](Typescript)
[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](React)

<br />

<img src="https://user-images.githubusercontent.com/16313579/224582406-c5f9491b-00be-4889-a4fe-b18987ec1e4c.png">

## Table of Contents

- [General Information](#general-information)
- [Getting Started with the Integration](#getting-started-with-the-integration)
- [Module Exports](#module-exports)

## General Information

- For React:18 on NodeJS:18
- For Keycloak Gold Standard.
- Works with Vanilla JavaScript or Typescript 5.
- Currenly requires a proxy pass to the api with `/api`.

## Getting Started with the Integration

1. Add the following line to your frontend `package.json` under `"dependencies":`:

```JSON
"@bcgov/keycloak-react": "https://github.com/bcgov/keycloak-react/releases/download/v1.0.0-alpha.1/bcgov-keycloak-react-1.0.0-alpha.1.tgz",
```

2. Add import `import { KeycloakProvider } from '@bcgov/keycloak-react';` to `main.tsx` file or wherever the `createRoot()` function is. Wrap `<KeycloakProvider>` component around the Router or Routes like shown below:

```JavaScript
import { KeycloakProvider } from '@bcgov/keycloak-react';
import { ThemeProvider } from '@mui/material';
import AppRouter from 'AppRouter';
import React from 'react';
import { createRoot } from 'react-dom/client';
import theme from 'theme';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <KeycloakProvider>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </KeycloakProvider>
  </React.StrictMode>,
);
```

3. Add import `import { KeycloakWrapper } from '@bcgov/keycloak-react';` to `AppRouter.tsx` file or wherever your routes are defined. Wrap `<KeycloakWrapper>` around Routes inside of Router like this example using `react-router-dom`:

```JavaScript
<Router>
  <KeycloakWrapper>
    <Header />
    <Routes>
      <Route
        path="/"
        element={<h1>Home</h1>}
      />
    </Routes>
    <Footer />
  </KeycloakWrapper>
</Router>
```

4. Use the following example to implement a login and logout button.

```JavaScript
import { useAuthService } from '@bcgov/keycloak-react';

const HomePage = () => {
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

For all user properties reference: https://github.com/bcgov/sso-keycloak/wiki/Identity-Provider-Attribute-Mapping  
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
