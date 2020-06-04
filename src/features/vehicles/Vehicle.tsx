import React from 'react';
import { Vehicle } from './store';

const VehicleComponent = ({
    make,
    model,
    enginePowerPS,
    enginePowerKW,
    fuelType,
    bodyType,
    engineCapacity,
}: Vehicle) => (
    <div className="vehicle">
        <div className="header">
            <span>{make}</span>
            <span> {model}</span>
        </div>
        <div className="detail">
            <span>{enginePowerPS} HP</span>
            <span>{enginePowerKW} KW</span>
            <span>{engineCapacity} cc</span>
            <span>{fuelType}</span>
            <span>{bodyType}</span>
        </div>
    </div>
);

export default VehicleComponent;
