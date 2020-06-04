import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

describe('App', () => {
    it('App render is okay', () => {
        mount(
            <Provider store={store}>
                <App />
            </Provider>,
        );
    });
});
