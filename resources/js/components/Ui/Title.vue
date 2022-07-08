
<script setup>
import Icon  from '../../components/Ui/Icon.vue';
defineProps({
    title: String,
    icon: String
});
</script>

<template>
    <div class="rounded-t mb-0 py-1 border-0">
        <div class="flex flex-wrap items-center">
            <div class="relative w-full  max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-lg text-blueGray-700 flex justify-start items-center">
                   <Icon :icon="icon" /> {{ title }}
                </h3>
            </div>
        </div>
    </div>
</template>
