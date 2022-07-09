<script setup>
import Icon from '../Ui/Icon.vue'
const props = defineProps({
    postTitle: String,
    putTitle: String,
    method: String,
});
</script>
<template>
    <h1 class="text-2xl px-6 py-3 w-full border-b-2 border-teal-700 text-teal-700 flex justify-start items-center flex-row">
        <Icon icon="fluent:phone-update-checkmark-20-regular" size="" />
       {{method === 'post' ? postTitle : putTitle}}
    </h1>
</template>
