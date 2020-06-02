import React, { FC } from 'react';
import Filters from './features/filters/Filters';
import { StateProvider } from './store/Store';
import './App.scss';

const App: FC = () => {
    return (
        <div className="App">
            <StateProvider>
                <Filters />
            </StateProvider>
        </div>
    );
};

export default App;
