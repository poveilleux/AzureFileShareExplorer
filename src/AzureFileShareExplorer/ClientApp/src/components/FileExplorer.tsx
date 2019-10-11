import React, { useEffect, useState } from 'react';
import TreeElement from './TreeElement';
import { appendToLocation } from '../helpers/locationHelpers';
import { ITreeElementModel, TreeElementModel } from '../models/treeElementModel';
import NavigationBar from './NavigationBar';
import useReactRouter from 'use-react-router';

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
    }, [location]);

    function navigate(element: TreeElementModel) {
        if (element.isFolder()) {
            const newLocation = appendToLocation(location.pathname, element.name);
            history.push(newLocation);
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
                            : data.map((e) => <TreeElement key={e.name} element={e} onDoubleClick={navigate} />)
                }
            </div>
        </div>
    );
}

export default FileExplorer;
