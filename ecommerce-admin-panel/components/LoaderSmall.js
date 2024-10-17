import React, { useEffect } from 'react';
import { hourglass } from 'ldrs';

const LoaderSmall = () => {
    useEffect(() => {
        hourglass.register();
    }, []);

    return (
        <div>
            <l-hourglass
                size="70"
                bg-opacity="0.1"
                speed="1"
                color="#ef4444"
            ></l-hourglass>
        </div>
    );
};

export default LoaderSmall;
