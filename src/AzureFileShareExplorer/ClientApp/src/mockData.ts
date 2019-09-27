import { TreeElementModel, ElementType, FolderElementModel } from "./models/treeElementModel";

export function getData(location: string): TreeElementModel[] {
    let data: TreeElementModel[] = [
        {
            type: ElementType.Folder,
            name: "Genetec.Identity.Sts",
            children: [
                generateTestResult("2019-09-06-00-00-00Z"),
                generateTestResult("2019-09-06-00-15-00Z"),
                generateTestResult("2019-09-06-00-30-00Z")
            ]
        } as FolderElementModel
    ];

    const locationSegments = location.split("/").filter(x => x);
    
    locationSegments.forEach(s => {
        const element = data.find(x => x.name === s) as FolderElementModel;
        data = element.children;
    });

    return data;
}

function generateTestResult(name: string): FolderElementModel {
    return {
        type: ElementType.Folder,
        name,
        children: [
            {
                type: ElementType.Folder,
                name: "Test #1",
                children: [
                    generateFile("logs.txt"),
                    generateFile("screenshot1.jpg"),
                    generateFile("screenshot2.jpg")
                ]
            } as FolderElementModel,
            {
                type: ElementType.Folder,
                name: "Test #2",
                children: [
                    generateFile("junit.xml"),
                    generateFile("screenshot.png")
                ]
            }
        ]
    };
}

function generateFile(name: string): TreeElementModel {
    return { type: ElementType.File, name };
}