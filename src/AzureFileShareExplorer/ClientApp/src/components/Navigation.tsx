import React from 'react';

interface NavigationProps {
    location: string[];
    navigateTo: (l: string[]) => void;
}

const Navigation: React.SFC<NavigationProps> = (props) => {
    const onClick = (index: number) => {
        props.navigateTo(props.location.slice(0, index + 1));
    };

    return (
        <div className="d-flex flex-row navigation-bar">
            <div className="navigation-controls">
                <i className="fas fa-long-arrow-alt-up" />
            </div>
            <div className="flex-fill location-breadcrumb">
                {
                    props.location.length
                        ? props.location
                            .map<React.ReactNode>((l, i) => <span key={l} className="location-segment" onClick={() => onClick(i)}>{l}</span>)
                            .reduce((prev, curr) => [prev, <span>  >  </span>, curr])
                        : null
                }
            </div>
        </div>
    );
};

export default Navigation;