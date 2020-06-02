import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectVehicles, fetchVehicles, Vehicle } from './store';
import { selectMake } from '../filters/make/store';
import { selectModels } from '../filters/model/store';

import './vehicles.scss';

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
        {make} - {model} - {enginePowerPS}
    </div>
);

const Vehicles: FC = () => {
    const { currentMake } = useSelector(selectMake);
    const { currentModel } = useSelector(selectModels);
    const { vehicles } = useSelector(selectVehicles);
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentMake && currentModel) {
            dispatch(fetchVehicles(currentMake, currentModel));
        }
    }, [dispatch, currentMake, currentModel]);

    return (
        <div className="vehicles">
            {vehicles.map((vehicle, index) => (
                <VehicleComponent key={index} {...vehicle} />
            ))}
        </div>
    );
};

export default Vehicles;
