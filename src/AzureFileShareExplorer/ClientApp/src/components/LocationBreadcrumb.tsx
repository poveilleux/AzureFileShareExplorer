import React from 'react';

interface LocationBreadcrumbProps {
    location: string[];
}

const LocationBreadcrumb: React.SFC<LocationBreadcrumbProps> = (props) => {
    return (
        <div className="location-breadcrumb">
            {
                props.location.length
                    ? props.location
                        .map<React.ReactNode>(l => <span key={l} className="location-segment">{l}</span>)
                        .reduce((prev, curr) => [prev, <span>  >  </span>, curr])
                    : null
            }
        </div>
    );
};

export default LocationBreadcrumb;