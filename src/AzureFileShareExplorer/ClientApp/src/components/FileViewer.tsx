/// <reference path="../../react-lazylog.aug.d.ts" />  

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import './FileViewer.scss';

import { LazyLog } from 'react-lazylog';

interface FileViewerProps {
    url: string;
    onHide: () => void;
}

const FileViewer: React.SFC<FileViewerProps> = (props) => {
    return (
        <div className="file-viewer">
            <Modal show={!!props.url} onHide={props.onHide} dialogClassName="file-viewer-modal">
                <ModalBody>
                    {
                        props.url
                            ? <LazyLog url={props.url} selectableLines enableSearch extraLines={1} />
                            : null
                    }
                </ModalBody>
            </Modal>
        </div>
    );
}

export default FileViewer;
