import React from 'react';
import { Post, User } from './api';

interface TestClientProps {
    posts: Post[]
    user: User
}

export const TestClient: React.FC<TestClientProps> = ({ user, posts }) => (
  <div>
    <h1>
      Welcome,
      {user.name}
    </h1>
    <h2>Posts</h2>
    <p>
      <ul>
        {posts && posts.map((post) => <li key={post.id}>{post.title}</li>)}
      </ul>
    </p>
  </div>
);
