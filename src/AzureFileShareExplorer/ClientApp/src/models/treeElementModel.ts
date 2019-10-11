export enum ElementType {
    File = "file",
    Folder = "folder"
}

export interface ITreeElementModel {
    type: string;
    name: string;
}

export abstract class TreeElementModel {
    constructor(public type: ElementType, public name: string) { }

    static create(e: ITreeElementModel): TreeElementModel {
        if (e.type === ElementType.Folder)
            return new FolderElementModel(e.name);
        else
            return new FileElementModel(e.name);
    }

    public isFolder(): boolean {
        return this.type === ElementType.Folder;
    }

    public isFile(): boolean {
        return this.type === ElementType.File;
    }
}

export class FolderElementModel extends TreeElementModel {
    constructor(name: string) {
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
