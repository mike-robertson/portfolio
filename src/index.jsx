import React from 'react';
import { render } from 'react-dom';
import Router from 'components/Router';
import './index.css';


// TODO this is used by material-ui, but we should remove when possible.
const reactElement = document.getElementById('react');
render(<Router />, reactElement);
