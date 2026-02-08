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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-lg w-11/12 max-w-lg p-6">
                {/* Modal Header */}
                {title && (
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 font-bold text-xl"
                        >
                            &times;
                        </button>
                    </div>
                )}

                {/* Modal Body */}
                <div className="mb-4">{children}</div>

                {/* Modal Footer */}
                {footer && <div className="flex justify-end space-x-2">{footer}</div>}
            </div>
        </div>
    );
};

export default DynamicModal;
