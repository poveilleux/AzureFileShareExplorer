import { useEffect, useState } from 'react';
import { ITreeElementModel, TreeElementModel } from '../models/treeElementModel';

/**
 * Loads the files and folders from an Azure File Share.
 * 
 * @param currentLocation The location from which to load the files and folders.
 */
export function useAzureFileShare(currentLocation: string): [TreeElementModel[], boolean, boolean] {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [data, setData] = useState<TreeElementModel[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(`/api${currentLocation}`);
                if (response.ok) {
                    const data = await response.json();
                    setData(data.map((d: ITreeElementModel) => TreeElementModel.create(d)));
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
    }, [currentLocation]);

    return [data, isLoading, hasError];
}
