<script setup>
import { Icon } from '@iconify/vue';
import { useUiStore } from '../../stores/ui'

const { colors } = useUiStore();

defineProps({
    icon: String,
    color: String,
    size: String
});
</script>
<template>
    <Icon :icon="icon" class="mr-2" :color="color === 'ligth' ? colors.text_ligth : colors.primary " :height="size === 'xs' ? 20 : 40" />
</template>
