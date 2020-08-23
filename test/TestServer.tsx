import express from 'express';
import React from 'react';
import { fetchPosts, fetchUser } from './api';
import { PrerenderedExpess } from '../src/prerendered';
import { TestClient } from './TestClient';

const app = express();

const prr = PrerenderedExpess(app);
app.use(prr.middleware({
  nonce: false,
}));

app.get('/*', prr.render({
  posts: fetchPosts(),
  user: fetchUser(),
})((data) => <TestClient posts={data.posts} user={data.user} />));

app.listen(3000, () => console.log('Listening'));
