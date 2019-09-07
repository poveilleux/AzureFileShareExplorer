import { TreeElement, ElementType, FolderElement } from "./models/treeElement";

export function getData(): TreeElement[] {
    return [
        {
            type: ElementType.Folder,
            name: "Genetec.Identity.Sts",
            children: [
                generateTestResult("2019-09-06-00-00-00Z"),
                generateTestResult("2019-09-06-00-15-00Z"),
                generateTestResult("2019-09-06-00-30-00Z")
            ]
        } as FolderElement
    ];
}

function generateTestResult(name: string): FolderElement {
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
            } as FolderElement,
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

function generateFile(name: string): TreeElement {
    return { type: ElementType.File, name };
}