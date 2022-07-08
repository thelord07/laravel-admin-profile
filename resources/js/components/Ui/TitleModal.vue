<script setup>
const props = defineProps({
    postTitle: String,
    putTitle: String,
    method: String,
});
</script>
<template>
    <h1 class="text-2xl pl-16 pt-10 mb-10">
       {{method === 'post' ? postTitle : putTitle}}
    </h1>
</template>
