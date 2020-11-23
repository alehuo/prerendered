import React from 'react';
import { hydrate } from 'react-dom';
import { TestClient } from './TestClient';
import { getPrerenderedData } from '../src/prerendered';

type Data = {
    user: {
        id: number;
        name: string;
    }, posts: Array<{
        id: number;
        title: string;
    }>
}

const data = getPrerenderedData<Data>();

hydrate(<TestClient user={data.user} posts={data.posts} />, document.getElementById('root'));
