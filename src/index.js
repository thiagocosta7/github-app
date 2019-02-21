'user strict'

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app';

const renderApp = (AppRender) => {
    render(
        <AppContainer>
            <AppRender />
        </AppContainer>,
        document.querySelector('[data-js="app"]')
    )   
}

renderApp(App);

if (module.hot){ //Verifica se está em dev com Hot Loader ativo
    module.hot.accept('./app', () => {
        const NextApp = require('./app').default 
        renderApp(NextApp);    
    });
}