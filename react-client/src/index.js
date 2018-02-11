import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue900 } from 'material-ui/styles/colors';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
const muiTheme = getMuiTheme({
    Color: blue900,
  });
ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </MuiThemeProvider>, 
    document.getElementById('root'));

registerServiceWorker();
