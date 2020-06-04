import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { fetchVehicles } from './store';
import { setCurrentMake } from '../filters/make/store';
import { setCurrentModel } from '../filters/model/store';
import Vehicles from './Vehicles';

const dummyResponse = [
    {
        make: 'FORD',
        model: 'Fiesta',
        enginePowerPS: 60,
        enginePowerKW: 44,
        fuelType: 'Benzin',
        bodyType: 'Limousine',
        engineCapacity: 1299,
    },
    {
        make: 'FORD',
        model: 'Fiesta',
        enginePowerPS: 68,
        enginePowerKW: 50,
        fuelType: 'Diesel',
        bodyType: 'Limousine',
        engineCapacity: 1399,
    },
    {
        make: 'FORD',
        model: 'Fiesta',
        enginePowerPS: 75,
        enginePowerKW: 55,
        fuelType: 'Benzin',
        bodyType: 'Limousine',
        engineCapacity: 1242,
    },
];

describe('Make', () => {
    let wrapper;
    it('Make render is okay', () => {
        mount(
            <Provider store={store}>
                <Vehicles />
            </Provider>,
        );
    });

    it('Make & Model set', () => {
        global.fetch = jest.fn().mockImplementationOnce((url) =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(dummyResponse),
            }),
        );

        store.dispatch(setCurrentMake('FORD'));
        store.dispatch(setCurrentModel('Fiesta'));

        wrapper = mount(
            <Provider store={store}>
                <Vehicles />
            </Provider>,
        );
    });

    it('Check state on fetch success', () => {
        const {
            vehicles: { vehicles },
        } = store.getState();
        expect(vehicles.length).toBeGreaterThan(0);
    });

    it('Vehicles are rendered', () => {
        wrapper.update();
        const {
            vehicles: { vehicles },
        } = store.getState();
        expect(wrapper.find('VehicleComponent').length).toEqual(vehicles.length);
    });

    it('Mock fetch failure', () => {
        global.fetch = jest.fn().mockImplementationOnce((url) =>
            Promise.resolve({
                ok: false,
                json: () => Promise.reject('failed'),
            }),
        );

        store.dispatch(fetchVehicles('FORD', 'Fiesta'));
    });

    it('Check state on fetch failure', () => {
        const {
            vehicles: { isError },
        } = store.getState();
        expect(isError).toEqual(true);
    });

    it('Check error wrapper', () => {
        wrapper.update();
        const overlay = wrapper.find('ErrorOverlay').getElement().props;
        expect(overlay.isError).toEqual(true);
    });
});
