import React, { type ReactNode } from "react";

interface DynamicModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    footer?: ReactNode;
    children?: ReactNode;
}

const DynamicModal: React.FC<DynamicModalProps> = ({ isOpen, onClose, title, footer, children }) => {
    if (!isOpen) return null;

    console.log(123);
    return (
        
       <>
        <div className="modal fade show d-block modal-animate">
            <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">

                <div className="modal-header">
                <h5 className="modal-title">{title}</h5>

                <button
                    type="button"
                    className="btn-close"
                    onClick={onClose}
                />
                </div>

                <div className="modal-body">
                {children}
                </div>


                {footer}

                {/* <div className="modal-footer">
                   
                </div> */}

                {/* <div className="modal-footer">
                    <button className="btn btn-primary">Submit</button>
					<button className="btn btn-outline-danger">Close</button>
                </div> */}

            </div>
            </div>
        </div>

        {/* backdrop */}
        <div className="modal-backdrop fade show"></div>
        </>
    );
};

export default DynamicModal;
