<script setup>
const props = defineProps({
    name: String,
    modelValue: String,
    placeholder: String,
});

defineEmits(['update:modelValue']);

</script>
<template>
<div class="flex justify-start flex-col w-full mt-2">
    <label class="mb-3">
        {{ placeholder }}
    </label>
    <textarea
        v-model="modelValue"
        :name="name"
        class="form-control mb-5"
        @change="$emit('update:modelValue', $event.target.value)"
    >

    </textarea>
    </div>
</template>
