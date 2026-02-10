import type { JSX, Key, ReactNode } from "react";

type SourceItem = {
    id: string;
    label: string;
};

type SourceData = {
    type: SourceItem[];
    status: SourceItem[];
};
// DEFAULT VIEW type config is view 
export default function IPManagementController() {
    return (
        <div>
            <h1>Budget Modsadfdafdsafdaule</h1>
            
        </div>
    );
}


export function source(): {} {
    
    const data: SourceData = {
        type: [
            { id: 'IPv4', label: 'IPv4' },
            { id: 'IPv6', label: 'IPv6' }
        ],
        status: [
            { id: '1', label: 'Active' },
            { id: '0', label: 'Inactive' }
        ]
    };

    const view = (<></>);

    return { data, view };
}

export function bindEvents() {
    return (
        <div>
            <h1>bindEvents</h1>
        </div>
    );
}