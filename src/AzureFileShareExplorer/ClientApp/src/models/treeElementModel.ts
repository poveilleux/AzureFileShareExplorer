export enum ElementType {
    File = "file",
    Folder = "folder"
}

export abstract class TreeElementModel {
    constructor(public type: ElementType, public name: string) { }

    public isFolder() {
        return this.type === ElementType.Folder;
    }
}

export class FolderElementModel extends TreeElementModel {
    constructor(name: string, public children: TreeElementModel[]) {
        super(ElementType.Folder, name);
    }
}

export class FileElementModel extends TreeElementModel {
    constructor(name: string) {
        super(ElementType.File, name);
    }
}