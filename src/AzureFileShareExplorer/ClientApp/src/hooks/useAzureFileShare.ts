import React from 'react';
import { ITreeElementModel, TreeElementModel } from 'src/models/treeElementModel';

/**
 * Loads the files and folders from an Azure File Share.
 * 
 * @param currentLocation The location from which to load the files and folders.
 */
export function useAzureFileShare(currentLocation: string): [TreeElementModel[], boolean, boolean] {
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);
    const [data, setData] = React.useState<TreeElementModel[]>([]);

    React.useEffect(() => {
        let subscribed = true;

        const fetchData = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(`/api${currentLocation}`);
                if (response.ok) {
                    const data = await response.json();
                    if (subscribed) {
                        setData(data.map((d: ITreeElementModel) => TreeElementModel.create(d)));
                    }
                } else if (response.status === 401) {
                    // Nullify the current user?
                    setHasError(true);
                } else {
                    setHasError(true);
                }
            } catch (e) {
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return function cleanup() {
            subscribed = false;
        };
    }, [currentLocation]);

    return [data, isLoading, hasError];
}
