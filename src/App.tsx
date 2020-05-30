import React, { FC } from 'react';
import './App.scss';
import Filters from './components/Filters';

const App: FC = () => {
    return (
        <div className="App">
            <Filters />
        </div>
    );
};

export default App;
