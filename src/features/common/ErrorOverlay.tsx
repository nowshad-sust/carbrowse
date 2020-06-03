import React from 'react';

interface ErrorType {
    isError: boolean;
    text: string;
    onResolve: () => void;
}

const ErrorOverlay = ({ isError, text, onResolve }: ErrorType) => {
    return (
        <div className={`overlay ${isError ? 'show' : 'hide'}`}>
            <p>{text}</p>
            <button onClick={onResolve}>Retry</button>
        </div>
    );
};

export default ErrorOverlay;
