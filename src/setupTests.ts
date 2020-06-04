// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

React.useLayoutEffect = React.useEffect;

configure({ adapter: new Adapter() });

// window.fetch = jest.fn();

// window.fetch.mockImplementation((url) => {
//     let response;
//     switch (true) {
//         case /makes/.test(url):
//             response = ['AUDI', 'BMW', 'CADILLAC', 'CHEVROLET', 'FORD'];
//             break;
//         case /models/.test(url):
//             response = ['B-MAX', 'C-Max', 'Cougar', 'Econovan', 'ECOSPORT', 'Fiesta'];
//             break;
//         case /vehicles/.test(url):
//             response = [
//                 {
//                     make: 'FORD',
//                     model: 'Fiesta',
//                     enginePowerPS: 60,
//                     enginePowerKW: 44,
//                     fuelType: 'Benzin',
//                     bodyType: 'Limousine',
//                     engineCapacity: 1299,
//                 },
//                 {
//                     make: 'FORD',
//                     model: 'Fiesta',
//                     enginePowerPS: 68,
//                     enginePowerKW: 50,
//                     fuelType: 'Diesel',
//                     bodyType: 'Limousine',
//                     engineCapacity: 1399,
//                 },
//                 {
//                     make: 'FORD',
//                     model: 'Fiesta',
//                     enginePowerPS: 75,
//                     enginePowerKW: 55,
//                     fuelType: 'Benzin',
//                     bodyType: 'Limousine',
//                     engineCapacity: 1242,
//                 },
//             ];
//             break;
//         default:
//             break;
//     }
//     return Promise.resolve({
//         ok: true,
//         json: () => Promise.resolve(response),
//     });
// });
