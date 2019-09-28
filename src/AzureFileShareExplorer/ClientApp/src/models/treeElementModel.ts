export enum ElementType {
    File = "file",
    Folder = "folder"
}

export abstract class TreeElementModel {
    constructor(public type: ElementType, public name: string) { }

    public isFolder(): boolean {
        return this.type === ElementType.Folder;
    }

    public isFile(): boolean {
        return this.type === ElementType.File;
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

    public isImage(): boolean {
        return this.name.endsWith(".png")
            || this.name.endsWith(".jpg");
    }

    public isText(): boolean {
        return this.name.endsWith(".txt");
    }
}