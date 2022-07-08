<script setup>
import { reactive } from "vue";
import { Inertia } from "@inertiajs/inertia";

import AdminLayout from "../../Layouts/AdminLayout.vue";
import Table from "@/Components/DataTable/Table.vue";
import Title from "../../components/Ui/Title.vue";
import JetModal from "../../Jetstream/Modal.vue";
import TitleModal from "@/Components/Ui/TitleModal.vue";
import Form from "../../components/Ui/Form.vue";
import Icon from '../../components/Ui/Icon.vue'

import { columns, dataForm } from "./settings";

defineProps({
    skills: Array,
});

const data = reactive({
    rows: [],
    acting: null,
    method: null,
    action: null,
    form: Inertia.form({
        name: "",
        identification: "",
        phone: "",
        email: "",
    }),
});

const { form } = data;

const handleClickEditRow = (row) => {
    data.rowSelected = row[0];
    data.acting = true;
    data.method = "put";
    data.action = route("skills.update", [row[0].id]);
    data.form.name = row[0].name;
    data.form.identification = row[0].identification;
    data.form.phone = row[0].phone;
    data.form.email = row[0].email;
};

const handleClickDeletetRow = (row) => {
    data.rowSelected = row[0];
    data.method = "delete";
    data.action = route("skills.delete", [row[0].id]);
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            submit();
        }
    });
};

const submit = () => {
    console.log("click");
    data.form.submit(data.method, data.action, {
        onSuccess: () => {
            form.reset();
            data.acting = null;
        },
    });
};
</script>
<template>
    <admin-layout>
        <Title title="Skills" icon="cib:skillshare" />
        <button
                    @click="
                        data.acting = true;
                        data.method = 'post';
                        data.action = route('skills.store');
                        data.form.reset();
                    "
                    class="absolute top-5 right-5 flex bg-teal-700 rounded-xl flex-row justify-center items-center px-4 py-2 "
                >
                   <Icon icon="bx:add-to-queue" color="ligth" size="xs" /> <span style="color:white">Agregar</span>
                </button>
        <JetModal
            :show="data.acting"
            :closeable="true"
            @close="data.acting = null"
        >
            <TitleModal :method="data.method" postTitle="Nuevo Skill" putTitle="Editar Skill" />
            <Form v-if="dataForm" :inputsForm="dataForm" :onSubmit="submit" :isForm="data.form" />
        </JetModal>
        <Table
            v-if="skills"
            :columns="columns"
            :rows="skills"
            @edit="handleClickEditRow"
            @delete="handleClickDeletetRow"

        />
    </admin-layout>
</template>
