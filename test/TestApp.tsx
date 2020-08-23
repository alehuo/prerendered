import React from 'react';
import { hydrate } from 'react-dom';
import { TestClient } from './TestClient';
import { getPrerenderedData } from '../src/prerendered';

const data = getPrerenderedData<{user: {
    id: number;
    name: string;
}, posts: Array<{
    id: number;
    title: string;
}>}>();

hydrate(<TestClient user={data.user} posts={data.posts} />, document.getElementById('root'));
