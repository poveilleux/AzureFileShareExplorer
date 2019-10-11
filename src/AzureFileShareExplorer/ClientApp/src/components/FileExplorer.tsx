import React, { useEffect, useState } from 'react';
import TreeElement from './TreeElement';
import { appendToLocation } from '../helpers/locationHelpers';
import { ITreeElementModel, TreeElementModel } from '../models/treeElementModel';
import NavigationBar from './NavigationBar';
import useReactRouter from 'use-react-router';

const FileExplorer: React.FC = () => {
    const { history, location } = useReactRouter();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ data, setData ] = useState<TreeElementModel[]>([]);

    const currentLocation = decodeURIComponent(location.pathname);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const response = await fetch(`/api${currentLocation}`);
            const data = await response.json();

            setIsLoading(false);

            setData(data.map((d: ITreeElementModel) => TreeElementModel.create(d)));
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
                    isLoading
                        ? <p>Loading...</p>
                        : data.map((e) => <TreeElement key={e.name} element={e} onDoubleClick={navigate} />)
                }
            </div>
        </div>
    );
}

export default FileExplorer;
