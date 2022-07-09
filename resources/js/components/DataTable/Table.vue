<script>
import { Icon } from "@iconify/vue";
import InputSearch from "./Components/InputSearch.vue";

export default {
    props: {
        columns: Array,
        rows: Object,
        selectRow: Function,
        color: {
            default: "light",
            validator: function (value) {
                // The value must match one of these strings
                return ["light", "dark"].indexOf(value) !== -1;
            },
        },
    },
    components: {
        Icon,
        InputSearch,
    },
    data() {
        return {
            dataRows: this.rows,
            sort: true,
            textSearch: "",
        };
    },
    methods: {
        handleClickSort(field) {
            this.dataRows = _.orderBy(
                this.rows,
                [field],
                [this.sort ? "asc" : "desc"]
            );
            this.sort = !this.sort;
        },

        doSearch() {
            const tableReg = document.getElementById("datos");
            const searchText = this.textSearch.toLowerCase();
            let total = 0;

            // Recorremos todas las filas con contenido de la tabla
            for (let i = 1; i < tableReg.rows.length; i++) {
                // Si el td tiene la clase "noSearch" no se busca en su cntenido
                if (tableReg.rows[i].classList.contains("noSearch")) {
                    continue;
                }

                let found = false;
                const cellsOfRow = tableReg.rows[i].getElementsByTagName("td");
                // Recorremos todas las celdas
                for (let j = 0; j < cellsOfRow.length && !found; j++) {
                    const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
                    // Buscamos el texto en el contenido de la celda
                    if (
                        searchText.length == 0 ||
                        compareWith.indexOf(searchText) > -1
                    ) {
                        found = true;
                        total++;
                    }
                }

                if (found) {
                    tableReg.rows[i].style.display = "";
                } else {
                    // si no ha encontrado ninguna coincidencia, esconde la
                    // fila de la tabla
                    tableReg.rows[i].style.display = "none";
                }
            }

            // mostramos las coincidencias

            const lastTR = tableReg.rows[tableReg.rows.length - 1];

            const td = lastTR.querySelector("td");

            lastTR.classList.remove("hide", "red");

            if (searchText == "") {
                lastTR.classList.add("hide");
            } else if (total) {
                /*  td.innerHTML="Se ha encontrado "+total+" coincidencia"+((total>1)?"s":""); */
            } else {
                lastTR.classList.add("red");

                /*  td.innerHTML="No se han encontrado coincidencias"; */
            }
        },
    },
    watch: {
        textSearch() {
            return this.doSearch();
        },
        rows() {
            console.log("rows", this.rows);
            this.dataRows = this.rows;
        },
    },
    $emits: ["edit"],
};
</script>

<template>
    <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 rounded"
        :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
    >
        <div class="rounded-t mb-0  py-3 border-0">
            <div class="flex flex-wrap items-center">
                <div class="relative w-full  max-w-full flex-grow flex-1">
                    <div class="flex justify-end items-center flex-row">
                        <InputSearch v-model:text="this.textSearch" />
                    </div>
                </div>
            </div>
        </div>
        <div class="block w-full overflow-x-auto">
            <!-- Projects table -->
            <table class="items-center w-full bg-transparent border-collapse">
                <thead>
                    <tr>
                        <th
                            v-for="(colunm, index) in this.columns"
                            :key="colunm.label + index"
                            class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                            :class="[
                                color === 'light'
                                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                    : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                            ]"
                        >
                            {{ colunm.label }}
                            <button
                                v-if="colunm.sortable"
                                @click="handleClickSort(colunm.field)"
                            >
                                <Icon icon="bxs:sort-alt" />
                            </button>
                        </th>
                        <th
                            class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-right"
                            :class="[
                                color === 'light'
                                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                    : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                            ]"
                        >
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(row, index) in this.dataRows"
                        :key="'tr-' + index"
                    >
                        <td
                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                            v-for="(column, index) in this.columns"
                            :key="'td-' + index"
                        >
                            <template
                                v-for="(k, index) in Object.keys(row)"
                                :key="'k-' + index"
                            >
                                <span
                                    v-if="
                                        column.field === k &&
                                        column.type === 'String'
                                    "
                                    v-text="row[k]"
                                ></span>
                                <span
                                    v-if="
                                        column.field === k &&
                                        column.type === 'Relation'
                                    "
                                    v-text="
                                        row[column.relation][
                                            column.relationField
                                        ]
                                    "
                                >
                                </span>
                                <div
                                    class="report-box__indicator tooltip cursor-pointer py-1 px-2 rounded text-xs w-[90px] text-center"
                                    :class="{
                                        'bg-success': row[k] === 1,
                                        'bg-danger text-white': row[k] === 0,
                                    }"
                                    v-if="
                                        column.field === k &&
                                        column.type === 'Boolean'
                                    "
                                >
                                    {{
                                        row[k] === 1 ? "Activa" : "Desactivada"
                                    }}
                                </div>
                            </template>
                        </td>
                        <td
                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
                        >
                            <div class="flex justify-end ">
                                <button
                                    class="bg-blue-500 p-3 rounded-lg mr-1"
                                    @click="$emit('edit', [row, 'edit'])"
                                >
                                    <Icon icon="bxs:edit" color="#FFFFFF" height="20px" />
                                </button>
                                <button
                                    class="bg-red-700 p-3 rounded-lg"
                                    @click="$emit('delete', [row, 'delete'])"
                                >
                                    <Icon icon="bxs:trash" color="#FFFFFF" height="20px" />

                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
