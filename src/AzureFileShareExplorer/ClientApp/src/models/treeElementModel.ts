export enum ElementType {
    File = "file",
    Folder = "folder"
}

export interface ITreeElementModel {
    type: string;
    name: string;
    uri: string;
    contentType: string;
}

export abstract class TreeElementModel {
  constructor(public type: ElementType, public name: string, public uri: string) { }

  static create(e: ITreeElementModel): TreeElementModel {
    if (e.type === ElementType.Folder)
      return new FolderElementModel(e.name, e.uri);
    else
      return new FileElementModel(e.name, e.uri, e.contentType);
  }

  public isFolder(): boolean {
    return this.type === ElementType.Folder;
  }

  public isFile(): boolean {
    return this.type === ElementType.File;
  }
}

export class FolderElementModel extends TreeElementModel {
  constructor(name: string, uri: string) {
    super(ElementType.Folder, name, uri);
  }
}

export class FileElementModel extends TreeElementModel {
  constructor(name: string, uri: string, public contentType: string) {
    super(ElementType.File, name, uri);
  }

  public isImage(): boolean {
    return this.contentType.startsWith("image/");
  }

  public isText(): boolean {
    return this.contentType.startsWith("text/")
            || this.contentType === "application/log";
  }
}
