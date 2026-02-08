import type { JSX, Key, ReactNode } from "react";

export interface SourceItem {
    id: Key;           // must be string or number (React key)
    name: string | ReactNode; // can be string, number, or JSX element
    email:string | ReactNode
}

export default function dashboardController() {
    return (
        <div>
            <h1>Budget Modsadfdafdsafdaule</h1>



            
        </div>
    );
}


export function source(): { data: SourceItem[]; view: JSX.Element } {
    const data: SourceItem[] = [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com" },

    ];

    const view = (
        <div>
            <h1>SOURCE</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );

    return { data, view };
}

export function bindEvents() {
    return (
        <div>
            <h1>bindEvents</h1>
        </div>
    );
}