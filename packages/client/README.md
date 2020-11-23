# @prerendered/client

\***\*WORK IN PROGRESS\*\***

## Instructions

`npm install --save @prerendered/client`

## Example

In the following example, we import the `SSRContext` which will grab the state from the HTML template for hydration.
The `useSSR` hook can be used to access that data.

If you use Redux or some other state management library, you can access the state with `getPrerenderedData` and use it to set the app's state.

In your `client.js` (entrypoint) file, do the following:

```jsx
// client.js
import React from "react";
import ReactDOM from "react-dom";
import { SSRContext } from "@prerendered/client";
import { App } from "./app";

ReactDOM.hydrate(
  // SSRContext looks for the data from window.__PRERENDERED__
  <SSRContext.Provider>
    <App />
  </SSRContext.Provider>,
  document.getElementById("root")
);
```

In your `app.js` file, follow the example below:

```jsx
// app.js
import React from "react";
import { useSSR } from "@prerendered/client";

export const App = () => {
  const ssrData = useSSR(); // You can now access all the data that was inserted server-side
  return <div>{ssrData.message}</div>;
};
```
