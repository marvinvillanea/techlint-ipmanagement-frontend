export default function () {
    return { //config
        component_type: 1, // 1 table | 0 content
        description:': This module handles Audit Logs Management, including adding, editing, and deleting users.',
        module_name: 'Audit Logs',
        source:'api_logs', //views
        button: "view|delete|edit|add", //action available
        column: [ // table header
            { accessorKey: "id", header: "ID" },
            { accessorKey: "ip", header: "IP Address" },
            { accessorKey: "user_agent", header: "User Agent" },
            { accessorKey: "method", header: "Method" },
            { accessorKey: "url", header: "URL" },
            { accessorKey: "request_body", header: "Request" },
            { accessorKey: "response_body", header: "Response" },
            { accessorKey: "status_code", header: "Status" },
            { accessorKey: "user_id", header: "UserID" },
            { accessorKey: "created_at", header: "Created At" },
            { accessorKey: "updated_at", header: "Updated At" },

        ],
        form: [ // field add edit
            { name: "ip", type: "text", className: '', label: 'IP Address', size: 'size', break: 0 },
            { name: "user_agent", type: "text", className: '', label: 'User Agent', size: 'size', break: 0 },
            { name: "method", type: "text", className: '', label: 'Method', size: 'size', break: 0 },
            { name: "url", type: "text", className: '', label: 'URL', size: 'size', break: 0 },
            { name: "request_body", type: "text", className: '', label: 'Request', size: 'size', break: 0 },
            { name: "response_body", type: "text", className: '', label: 'Response', size: 'size', break: 0 },
            { name: "status_code", type: "text", className: '', label: 'Status', size: 'size', break: 0 },

        ]
    };
}
