import React, { useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';

import TreeElement from './TreeElement';
import NavigationBar from './NavigationBar';
import { downloadFile } from '../helpers/fileHelpers';
import { appendToLocation } from '../helpers/locationHelpers';
import { ITreeElementModel, TreeElementModel, FileElementModel } from '../models/treeElementModel';
import FileViewer from './FileViewer';

function displayErrorMessage(): JSX.Element {
    const onClick = () => window.location.reload();

    return (
        <Alert variant="danger">
            An error occurred while retrieving the directory's content.
            <Button variant="danger" size="sm" className="ml-2" onClick={onClick}>
                Try again
            </Button>
        </Alert>
    );
}

function displayLoading(): JSX.Element {
    return (
        <p>Loading...</p>
    );
}

function getFilePath(currentLocation: string, file: FileElementModel | null): string {
    return file
        ? `/api${currentLocation}/${file.name}`
        : "";
}

const FileExplorer: React.FC = () => {
    const { history, location } = useReactRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [data, setData] = useState<TreeElementModel[]>([]);
    const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeFile, setActiveFile] = useState<FileElementModel | null>(null);

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
        .map(x => ({ src: getFilePath(currentLocation, x as FileElementModel), alt: x.name }));

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
            } else if (file.isText()) {
                setActiveFile(file);
            } else {
                downloadFile(getFilePath(currentLocation, file), file.name);
            }
        }
    }

    return (
        <div>
            <header className="App-header">
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

            <Viewer
                visible={isImageViewerVisible}
                onClose={() => setIsImageViewerVisible(false)}
                rotatable={false} drag={false} zoomable={false} scalable={false}
                disableMouseZoom={true} noImgDetails={true}
                activeIndex={activeIndex}
                images={images} />

            <FileViewer
                url={getFilePath(currentLocation, activeFile)}
                onHide={() => setActiveFile(null)} />            
        </div>
    );
}

export default FileExplorer;
