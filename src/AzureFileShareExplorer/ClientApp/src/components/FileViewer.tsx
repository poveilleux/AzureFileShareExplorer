import React from "react";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import { LazyLog } from "react-lazylog";

import "src/components/FileViewer.scss";

interface FileViewerProps {
    url: string;
    onHide: () => void;
}

const FileViewer: React.FC<FileViewerProps> = (props: FileViewerProps) => {
  const fetchOptions: RequestInit = {
    credentials: "same-origin"
  };

  return (
    <div className="file-viewer">
      <Modal show={!!props.url} onHide={props.onHide} dialogClassName="file-viewer-modal">
        <ModalBody>
          {
            props.url
              ? <LazyLog url={props.url} selectableLines enableSearch extraLines={1} fetchOptions={fetchOptions} />
              : null
          }
        </ModalBody>
      </Modal>
    </div>
  );
};

export default FileViewer;
