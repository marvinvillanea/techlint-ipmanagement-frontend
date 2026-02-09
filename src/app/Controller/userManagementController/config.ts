export default function () {
    return { //config
        component_type: 1, // 1 table | 0 content
        source:'v_usermanagement', //views
        button: "view|delete|edit|add", //action available
        column: [ // table header
            { accessorKey: "id", header: "ID" },
            { accessorKey: "name", header: "Name" },
            { accessorKey: "email", header: "Email" }
        ],
        form: [ // field add edit
            { name: "id", type: "ID", className: '', key: 'id-key', size: 'size', break: 0 }
        ]
    };
}
