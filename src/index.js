import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GraphComponent from './components/graph';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<GraphComponent />, document.getElementById('root'));
registerServiceWorker();