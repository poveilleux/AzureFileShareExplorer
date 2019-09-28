import React from 'react';
import './NavigationBar.scss';

interface NavigationBarProps {
    location: string[];
    navigateTo: (l: string[]) => void;
}

const NavigationBar: React.SFC<NavigationBarProps> = (props) => {
    const onClick = (index: number) => {
        props.navigateTo(props.location.slice(0, index));
    };
    const isUpDisabled = props.location.length === 0;

    return (
        <div className="d-flex flex-row navigation-bar">
            <div className="navigation-controls">
                <i className={`fas fa-long-arrow-alt-up ${isUpDisabled ? "disabled" : ""}`}
                    onClick={!isUpDisabled ? () => onClick(props.location.length - 1) : () => {}} />
            </div>
            <div className="flex-fill location-breadcrumb">
                {
                    props.location.length
                        ? props.location
                            .map<React.ReactNode>((l, i) => <span key={l} className="location-segment" onClick={() => onClick(i + 1)}>{l}</span>)
                            .reduce((prev, curr) => [prev, <span>  >  </span>, curr])
                        : null
                }
            </div>
        </div>
    );
};

export default NavigationBar;
