export default function () {
    return { //config
        component_type: 1, // 1 table | 0 content
        description:': This module handles user management, including adding, editing, and deleting users.',
        module_name: 'User Management',
        source:'v_usermanagement', //views
        button: "view|delete|edit|add", //action available
        column: [ // table header
            { accessorKey: "id", header: "ID" },
            { accessorKey: "name", header: "Name" },
            { accessorKey: "email", header: "Email" },
            { accessorKey: "permission", header: "Permission" },

        ],
        form: [ // field add edit
            { name: "name", type: "text", className: '', label: 'Name', size: 'size', break: 0 },
            { name: "email", type: "email", className: '', label: 'Email', size: 'size', break: 0 },
            { name: "permission", type: "html", className: '', label: 'Permission', size: 'size', break: 0 },
            { name: "password", type: "password", className: '', label: 'Password', size: 'size', break: 0 },
        ]
    };
}
