# Prerendered

It is a known fact that Server-side rendering involves a big boilerplate which makes implementing SSR on existing projects very time-consuming. What if we could skip all the setup phases and enable SSR functionality for our application? 

Prerendered is an SSR toolkit which handles the following:

- Data-fetching
- Hydration
- Content-security policy Nonce generation
- Page `<head>` element changes with React Helmet

## MVP

In this following MVP, Prerendered is initialized with its CSP Nonce middleware disabled. We fetch data from two REST APIs and pass them to the component that will be server-side rendered.

```jsx
import express from 'express';
import React from 'react';
import { PrerenderedExpess } from 'prerendered';
import { fetchPosts, fetchUser } from './api';
import { Client } from '../Client/Client';

const app = express();

const prr = PrerenderedExpess();
app.use(prr.middleware({
  nonce: false,
}));

app.get('/*', prr.render({
  posts: fetchPosts(),
  user: fetchUser(),
})((data) => <Client posts={data.posts} user={data.user} />));

app.listen(3000, () => console.log('Listening'));
```

## Proposals / ideas

### CLI

- `prerendered build` builds the Client JS file and outputs it into prerendered's static assets dir

### Hydration

The component that is server-side rendered needs to be built with a build-tool (such as Webpack, Parcel or Rollup) and served as a static asset from the Prerendered application, to enable hydration. I will provide a JSON configuration file that contains a Webpack template which will work straight out of the box.

## License

MIT license. See LICENSE for details.