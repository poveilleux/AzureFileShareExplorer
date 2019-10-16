import React, { useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';

import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';

import TreeElement from './TreeElement';
import NavigationBar from './NavigationBar';
import { appendToLocation } from '../helpers/locationHelpers';
import { ITreeElementModel, TreeElementModel, FileElementModel } from '../models/treeElementModel';

function displayErrorMessage(): JSX.Element {
    const onClick = () => window.location.reload();

    return (
        <div className="alert alert-danger" role="alert">
            An error occurred while retrieving the directory's content.
            <button type="button" className="btn btn-danger btn-sm ml-2" onClick={onClick}>Try again</button>
        </div>
    );
}

function displayLoading(): JSX.Element {
    return (
        <p>Loading...</p>
    );
}

const FileExplorer: React.FC = () => {
    const { history, location } = useReactRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [data, setData] = useState<TreeElementModel[]>([]);
    const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const currentLocation = decodeURIComponent(location.pathname);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(`/api${currentLocation}`);
                const data = await response.json();
                setData(data.map((d: ITreeElementModel) => TreeElementModel.create(d)));
            } catch (e) {
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [currentLocation]);

    const images = data
        .filter(x => x.isFile() && (x as FileElementModel).isImage())
        .map(x => ({ src: `/api/${currentLocation}/${x.name}`, alt: x.name }));

    function onOpenElement(element: TreeElementModel) {
        if (element.isFolder()) {
            const newLocation = appendToLocation(location.pathname, element.name);
            history.push(newLocation);
        } else if (element.isFile()) {
            const file = element as FileElementModel;
            if (file.isImage()) {
                const activeIndex = images.findIndex(x => x.alt === file.name);
                setActiveIndex(activeIndex >= 0 ? activeIndex : 0);
                setIsImageViewerVisible(true);
            }
        }
    }

    return (
        <div className="container">
            <header className="App-header">
                <h1>Azure File Share Explorer</h1>
                <NavigationBar location={currentLocation} navigateTo={l => history.push(l)} />
            </header>
            <div>
                {
                    hasError
                        ? displayErrorMessage()
                        : isLoading
                            ? displayLoading()
                            : data.map((e) => <TreeElement key={e.name} element={e} onDoubleClick={onOpenElement} />)
                }
            </div>

            <Viewer visible={isImageViewerVisible} onClose={() => setIsImageViewerVisible(false)}
                rotatable={false} drag={false} zoomable={false} scalable={false} disableMouseZoom={true}
                noImgDetails={true} activeIndex={activeIndex} images={images} />
        </div>
    );
}

export default FileExplorer;
