import React, { FC } from 'react';
import Make from './make/Make';
import Model from './model/Model';
import './filters.scss';

const Filters: FC = () => {
    return (
        <div className="filters">
            <Make />
            <Model />
        </div>
    );
};

export default Filters;
