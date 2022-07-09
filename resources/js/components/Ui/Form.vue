<script setup>
import JetInput from "../../Jetstream/Input.vue";
import JetButton from "../../Jetstream/Button.vue";
import JetInputError from "../../Jetstream/InputError.vue";
import JetCheckbox from "../../Jetstream/Checkbox.vue";
import JetSelect from "../../Jetstream/Select.vue";
import JetTextArea from "../../Jetstream/TextArea.vue";




const props = defineProps({
    inputsForm: Array,
    onSubmit: Function,
    isForm: Object,
    selects: Array,
});


</script>
<template>
    <form
        v-if="inputsForm"
        class="flex flex-col items-center px-6 w-full"
        @submit.prevent="onSubmit"
    >
        <template v-for="(item, index) in inputsForm" :key="index">
            <JetInput-error :message="isForm.errors[item?.name]" />
            <label v-if="item?.need_title" :for="item?.name" class="flex w-full mb-4" >
                {{ item?.placeholder }}
            </label>
            <JetInput
                v-if="
                    item?.type === 'text' ||
                    item?.type === 'email' ||
                    item?.type === 'password' ||
                    item?.type === 'number'
                "
                class="w-full mt-5"
                :type="item?.type"
                :name="item?.name"
                :placeholder="item?.placeholder"
                v-model="isForm[item?.name]"
                :disabled="item?.disabled"
                :value="item?.default ? item.default : ''"
            />
            <JetCheckbox
                v-if="item?.type === 'checkbox'"
                v-model:checked="isForm[item?.name]"
                :label="item?.placeholder"
            />
            <JetSelect
                v-if="item?.type === 'select'"
                :name="item?.name"
                :options="selects[item?.index][item?.prop]"
                :nameOption="item?.nameOption"
                v-model="isForm[item?.name]"
                :placeholder="item?.placeholder"
            />
            <JetTextArea
                v-if="item?.type === 'textarea'"
                :name="item?.name"
                :placeholder="item?.placeholder"
                v-model="isForm[item?.name]"
                />
        </template>

        <div class="w-full flex justify-end pt-5">
            <jet-button class="btn btn-primary " :disabled="isForm.processing">
                <span class="animate-spin mr-1" v-show="isForm.processing">
                    &#9696;
                </span>

                <span v-show="!isForm.processing"> Guardar </span>
            </jet-button>
        </div>
    </form>
</template>
