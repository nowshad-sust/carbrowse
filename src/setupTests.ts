// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

React.useLayoutEffect = React.useEffect;

configure({ adapter: new Adapter() });
