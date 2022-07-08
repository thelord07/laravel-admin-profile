export const columns = [
    {
        label: "ID",
        field: "id",
        sortable: true,
        isKey: true,
        searchenable: false,
        type:'String',
    },
    {
        label: "Nombre",
        field: "name",
        sortable: true,
        searchenable: true,
        type:'String',
    },
    {
        label: "Color",
        field: "color",
        sortable: false,
        searchenable: true,
        type:'String',
    }
];

export const dataForm = [
    {
        name: "name",
        type: "text",
        placeholder: "Nombre",
        required: true,
    },
    {
        name: "color",
        type: "text",
        placeholder: "color",
        required: true,

    }
];
