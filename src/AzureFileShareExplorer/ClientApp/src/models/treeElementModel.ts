export enum ElementType {
    File = "file",
    Folder = "folder"
}

export interface TreeElementModel {
    type: ElementType;
    name: string;
}

export interface FolderElementModel extends TreeElementModel {
    children: TreeElementModel[];
}