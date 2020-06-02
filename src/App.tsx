import React, { FC } from 'react';
import Filters from './features/filters/Filters';
import Vehicles from './features/vehicles/Vehicles';
import './App.scss';

const App: FC = () => {
    return (
        <div className="App">
            <Filters />
            <Vehicles />
        </div>
    );
};

export default App;
