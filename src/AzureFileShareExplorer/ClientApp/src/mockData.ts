import { TreeElementModel, FolderElementModel, FileElementModel } from './models/treeElementModel';
import { locationToArray } from './helpers/locationHelpers';

const data: TreeElementModel[] = [
    new FolderElementModel("Genetec.Identity.Sts", [
        new FolderElementModel("synthetic", [
            generateTestResult("2019-09-06-00-00-00Z"),
            generateTestResult("2019-09-06-00-15-00Z"),
            generateTestResult("2019-09-06-00-30-00Z")
        ])
    ])
];

export function getData(location: string): TreeElementModel[] {
    let currentData = data;

    locationToArray(location).forEach(loc => {
        const element = currentData.find(x => x.name === loc) as FolderElementModel;
        currentData = element.children;
    });

    return currentData;
}

function generateTestResult(name: string): FolderElementModel {
    return new FolderElementModel(name, [
        new FolderElementModel("screenshots", [
            new FileElementModel("screenshot1.jpg"),
            new FileElementModel("screenshot2.jpg")
        ]),
        new FileElementModel("logs.txt"),
        new FileElementModel("junit.xml")
    ]);
}