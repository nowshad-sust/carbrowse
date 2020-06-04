import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import { fetchMakes } from './store';
import Make from './Make';

describe('Make', () => {
    let wrapper;
    it('Make render is okay', () => {
        mount(
            <Provider store={store}>
                <Make />
            </Provider>,
        );
    });

    it('Default Select props', () => {
        global.fetch = jest.fn().mockImplementationOnce((url) =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(['AUDI', 'BMW', 'CADILLAC', 'CHEVROLET', 'FORD']),
            }),
        );
        wrapper = mount(
            <Provider store={store}>
                <Make />
            </Provider>,
        );
        const { placeholder, options, isLoading, isDisabled } = wrapper.find('Select').first().getElement().props;

        expect(placeholder).toEqual('Makes is empty!');
        expect(options.length).toEqual(0);
        expect(isLoading).toEqual(true);
        expect(isDisabled).toEqual(true);
    });

    it('Check state on fetch success', () => {
        const {
            makes: { makes, isLoading, isError },
        } = store.getState();
        expect(makes.length).toBeGreaterThan(0);
    });

    it('Mock fetch failure', () => {
        global.fetch = jest.fn().mockImplementationOnce((url) =>
            Promise.resolve({
                ok: false,
                json: () => Promise.reject('failed'),
            }),
        );

        store.dispatch(fetchMakes());
    });

    it('Check state on fetch failure', () => {
        const {
            makes: { isError },
        } = store.getState();
        expect(isError).toEqual(true);
    });

    it('Check error wrapper', () => {
        wrapper.update();
        const overlay = wrapper.find('ErrorOverlay').getElement().props;
        expect(overlay.isError).toEqual(true);
    });
});
