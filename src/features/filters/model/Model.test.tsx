import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import { fetchModels } from './store';
import { setCurrentMake } from '../make/store';
import Model from './Model';

describe('Model', () => {
    let wrapper;
    it('Model render is okay', () => {
        mount(
            <Provider store={store}>
                <Model />
            </Provider>,
        );
    });

    it('Default Select props', () => {
        global.fetch = jest.fn().mockImplementationOnce((url) =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(['B-MAX', 'C-Max', 'Cougar', 'Econovan', 'ECOSPORT', 'Fiesta']),
            }),
        );

        wrapper = mount(
            <Provider store={store}>
                <Model />
            </Provider>,
        );
        const { placeholder, options, isLoading, isDisabled } = wrapper.find('Select').first().getElement().props;

        expect(placeholder).toEqual('Select car model');
        expect(options.length).toEqual(0);
        expect(isLoading).toEqual(false);
        expect(isDisabled).toEqual(true);
    });

    it('Fetch models', () => {
        store.dispatch(setCurrentMake('FORD'));
        store.dispatch(fetchModels('FORD'));
    });

    it('Check state successful models fetch', () => {
        expect(store.getState().models.models.length).toBeGreaterThan(0);
    });

    it('Mock fetch failure', () => {
        global.fetch = jest.fn().mockImplementationOnce((url) =>
            Promise.resolve({
                ok: false,
                json: () => Promise.reject('failed'),
            }),
        );

        store.dispatch(fetchModels('FORD'));
    });

    it('Check state on fetch failure', () => {
        const {
            models: { isError },
        } = store.getState();
        expect(isError).toEqual(true);
    });

    it('Check error wrapper', () => {
        wrapper.update();
        const overlay = wrapper.find('ErrorOverlay').getElement().props;
        expect(overlay.isError).toEqual;
    });
});
