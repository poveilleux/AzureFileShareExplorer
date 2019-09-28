import { TreeElementModel, FolderElementModel, FileElementModel } from "./models/treeElementModel";

const data: TreeElementModel[] = [
    new FolderElementModel("Genetec.Identity.Sts", [
        generateTestResult("2019-09-06-00-00-00Z"),
        generateTestResult("2019-09-06-00-15-00Z"),
        generateTestResult("2019-09-06-00-30-00Z")
    ])
];

export function getData(location: string): TreeElementModel[] {
    const locationSegments = location.split("/").filter(x => x);

    let currentData = data;

    locationSegments.forEach(s => {
        const element = currentData.find(x => x.name === s) as FolderElementModel;
        currentData = element.children;
    });

    return currentData;
}

function generateTestResult(name: string): FolderElementModel {
    console.log("generateTestResult: " + name);
    return new FolderElementModel(name, [
        new FolderElementModel("Test #1", [
            new FileElementModel("logs.txt"),
            new FileElementModel("screenshot1.jpg"),
            new FileElementModel("screenshot2.jpg")
        ]),
        new FolderElementModel("Test #2", [
            new FileElementModel("junit.xml"),
            new FileElementModel("screenshot.png")
        ])
    ]);
}