export default function () {
    return { //config
        component_type: 1, // 1 table | 0 content
        description:': This module handles IP`s Management, including adding, editing, and deleting users.',
        module_name: 'IPs Management',
        source:'v_iplist', //views
        button: "view|delete|edit|add", //action available
        column: [ // table header
            { accessorKey: "id", header: "ID" },
            { accessorKey: "ip_address", header: "IP Address" },
            { accessorKey: "type", header: "Type" },
            { accessorKey: "remarks", header: "Remarks" },
            { accessorKey: "status", header: "Status" },

        ],
        form: [ // field add edit
            { name: "ip_address", type: "text", className: '', label: 'IP Address', size: 'size', break: 0 },
            { name: "type", type: "select", className: '', label: 'Type', size: 'size', break: 0 },
            { name: "remarks", type: "textarea", className: '', label: 'Remarks', size: 'size', break: 0 },
            { name: "status", type: "select", className: '', label: 'Status', size: 'size', break: 0 },
        ]
    };
}
