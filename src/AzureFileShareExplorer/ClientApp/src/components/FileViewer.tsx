import React from 'react';

interface FileViewerProps {
    isVisible: boolean;
    url: string;
}

const FileViewer: React.SFC<FileViewerProps> = (props) => {


    return (
        <div className="file-viewer">
            <div className={`modal fade ${props.isVisible ? "show" : ""}`} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            {props.url}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileViewer;
