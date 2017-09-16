import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {AppContainer} from 'react-hot-loader';

import configureStore from './redux/configureStore';
import App from './app';


let store = configureStore();


render(App);

if (module.hot) {
    module.hot.accept('./app', () => {
        let AppRoot = require('./app').default;
        render(AppRoot);
    });
}


function render(AppComponent) {
    ReactDOM.render((
        <AppContainer>
            <Provider store={store}>
                <AppComponent />
            </Provider>
        </AppContainer>),
        document.getElementById('mainAppRoot')
    );
}
