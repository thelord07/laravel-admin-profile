<script setup>
const props = defineProps({
    options: Array,
    name: String,
    modelValue: String,
    nameOption: String,
    placeholder: String,
});

defineEmits(['update:modelValue']);

</script>
<template>
<div class="flex justify-start flex-col w-full mt-2">
    <label class="mb-3">
        {{ placeholder }}
    </label>
    <select
        v-model="modelValue"
        :name="name"
        class="form-control mb-5"
        @change="$emit('update:modelValue', $event.target.value)"
    >
        <option disabled value="">Selecciona el {{ placeholder }}</option>
        <option
            v-for="(option, index) in options"
            :key="index"
            :value="option.id"
            :selected="{selected: option.id === modelValue}"
        >
            {{ option[nameOption] }}
        </option>
    </select>
    </div>
</template>
