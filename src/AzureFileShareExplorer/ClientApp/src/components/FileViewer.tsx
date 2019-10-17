import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import './FileViewer.scss';

import { LazyLog } from 'react-lazylog';

interface FileViewerProps {
    url: string | null;
    onHide: () => void;
}

const FileViewer: React.SFC<FileViewerProps> = (props) => {
    return (
        <div className="file-viewer">
            <Modal show={props.url !== null} onHide={props.onHide} dialogClassName="file-viewer-modal">
                <ModalBody>
                    {
                        props.url
                            ? <LazyLog url={props.url} />
                            : null
                    }
                </ModalBody>
            </Modal>
        </div>
    );
}

export default FileViewer;
