import React from 'react';
import { hydrate } from 'react-dom';
import { SSRContext } from '@prerendered/client';
import { Client } from './Client';

// You might want to use Redux or some other form of state management to keep the UI better in sync.

hydrate(
  <SSRContext>
    <Client />
  </SSRContext>,
  document.getElementById('container'),
);