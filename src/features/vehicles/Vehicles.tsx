import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectVehicles, fetchVehicles } from './store';
import { selectMake } from '../filters/make/store';
import { selectModels } from '../filters/model/store';
import ErrorOverlay from '../common/ErrorOverlay';
import VehicleComponent from './Vehicle';

import './vehicles.scss';

const Vehicles: FC = () => {
    const { currentMake } = useSelector(selectMake);
    const { currentModel } = useSelector(selectModels);
    const { isError, isLoading, vehicles } = useSelector(selectVehicles);
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentMake && currentModel) {
            dispatch(fetchVehicles(currentMake, currentModel));
        }
    }, [dispatch, currentMake, currentModel]);

    const Empty = () => (
        <div className="empty">
            <p>No results found for your search! Please try with different filters.</p>
        </div>
    );

    return (
        <div className="vehicles">
            <div className="content">
                {vehicles.map((vehicle, index) => (
                    <VehicleComponent key={index} {...vehicle} />
                ))}
                {currentMake && currentModel && !isError && !isLoading && vehicles?.length === 0 && <Empty />}
            </div>
            <ErrorOverlay
                isError={isError}
                text="Failed to fetch vehicles!"
                onResolve={() => currentMake && currentModel && dispatch(fetchVehicles(currentMake, currentModel))}
            />
        </div>
    );
};

export default Vehicles;
