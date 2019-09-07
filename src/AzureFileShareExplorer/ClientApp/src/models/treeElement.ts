export enum ElementType {
    File = "file",
    Folder = "folder"
}

export interface TreeElement {
    type: ElementType;
    name: string;
}

export interface FolderElement extends TreeElement {
    children: TreeElement[];
}