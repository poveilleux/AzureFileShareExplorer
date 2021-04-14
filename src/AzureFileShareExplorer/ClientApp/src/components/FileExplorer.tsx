import React from "react";
import useReactRouter from "use-react-router";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Viewer from "react-viewer";

import TreeElement from "src/components/TreeElement";
import NavigationBar from "src/components/NavigationBar";
import { downloadFile } from "src/helpers/fileHelpers";
import { appendToLocation } from "src/helpers/locationHelpers";
import { useAzureFileShare } from "src/hooks/useAzureFileShare";
import { TreeElementModel, FileElementModel } from "src/models/treeElementModel";
import FileViewer from "src/components/FileViewer";

function displayErrorMessage(): JSX.Element {
  const onClick = () => window.location.reload();

  return (
    <Alert variant="danger">
      An error occurred while retrieving the directory&apos;s content.
      <Button variant="danger" size="sm" className="ml-2" onClick={onClick}>
        Try again
      </Button>
    </Alert>
  );
}

function displayLoading(): JSX.Element {
  return (
    <p>Loading...</p>
  );
}

const FileExplorer: React.FC = () => {
  const { history, location } = useReactRouter();
  const [isImageViewerVisible, setIsImageViewerVisible] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [activeFile, setActiveFile] = React.useState<FileElementModel | null>(null);

  const currentLocation = decodeURIComponent(location.pathname)
    .replace(process.env.PUBLIC_URL, "");
  const [data, isLoading, hasError] = useAzureFileShare(currentLocation);

  const images = data
    .filter(x => x.isFile() && (x as FileElementModel).isImage())
    .map(file => ({ src: file.uri, alt: file.name }));

  function onOpenElement(element: TreeElementModel) {
    if (element.isFolder()) {
      const newLocation = appendToLocation(location.pathname, element.name);
      history.push(newLocation);
    } else if (element.isFile()) {
      const file = element as FileElementModel;
      if (file.isImage()) {
        const activeIndex = images.findIndex(x => x.alt === file.name);
        setActiveIndex(activeIndex >= 0 ? activeIndex : 0);
        setIsImageViewerVisible(true);
      } else if (file.isText()) {
        setActiveFile(file);
      } else {
        downloadFile(`${file.uri}?download=true`, file.name);
      }
    }
  }

  return (
    <div>
      <header className="App-header">
        <NavigationBar location={currentLocation} navigateTo={l => {
          const newLocation = `${process.env.PUBLIC_URL}${l}`;
          history.push(newLocation);
        }} />
      </header>
      <div>
        {
          hasError
            ? displayErrorMessage()
            : isLoading
              ? displayLoading()
              : data.map((e) => <TreeElement key={e.name} element={e} onDoubleClick={onOpenElement} />)
        }
      </div>

      <Viewer
        visible={isImageViewerVisible}
        onClose={() => setIsImageViewerVisible(false)}
        rotatable={false} drag={false} zoomable={false} scalable={false}
        disableMouseZoom={true} noImgDetails={true}
        activeIndex={activeIndex}
        images={images} />

      <FileViewer
        url={activeFile?.uri ?? ""}
        onHide={() => setActiveFile(null)} />
    </div>
  );
};

export default FileExplorer;
