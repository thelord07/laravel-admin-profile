<script setup>
import  Icon  from '../../Ui/Icon.vue'
import {useUiStore} from '../../../stores/ui'

const { colors } = useUiStore();

defineProps({
    text: String,
});

defineEmits(['update:text']);



</script>
<template>
    <div class="relative  flex flex-row justify-start w-[200px] ">
        <div class="search hidden sm:block">
            <input
                type="text"
                class="border-teal-700 rounded-lg w-full"
                placeholder="Search..."
                @input="$emit('update:text', $event.target.value)"
            />
        </div>
        <a class=" absolute right-0 top-3 " href="">
            <Icon
                icon="akar-icons:search"
                size="xs"
            />
        </a>
    </div>
</template>
