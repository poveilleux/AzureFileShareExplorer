import React from 'react';

import 'src/components/NavigationBar.scss';
import { locationToArray } from '../helpers/locationHelpers';

interface NavigationBarProps {
    location: string;
    navigateTo: (l: string) => void;
}

const NavigationBar: React.SFC<NavigationBarProps> = (props) => {
    const location = locationToArray(props.location);

    const onClick = (index: number) => {
        const newLocation = "/" + location.slice(0, index).join("/");
        props.navigateTo(newLocation);
    };

    const hasSegments = location.length > 0;
    return (
        <div className="d-flex flex-row navigation-bar">
            <div className="navigation-controls">
                <i className={`fas fa-long-arrow-alt-up ${!hasSegments ? "disabled" : ""}`}
                    onClick={hasSegments ? () => onClick(location.length - 1) : () => {}} />
            </div>
            <div className="flex-fill location-breadcrumb">
                {
                    hasSegments
                        ? location
                            .map<React.ReactNode>((l, i) => <span key={l} className="location-segment" onClick={() => onClick(i + 1)}>{l}</span>)
                            .reduce((prev, curr, i) => [prev, <span key={i} className="mx-1">&gt;</span>, curr])
                        : null
                }
            </div>
        </div>
    );
};

export default NavigationBar;
