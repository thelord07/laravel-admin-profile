<script>
import { Icon } from "@iconify/vue";
export default {
    props:['text'],
    emits:['update:text'],
    components:{
        Icon
    }
}


</script>
<template>
    <div className="relative border border-sky-500 rounded-lg flex flex-row justify-start ">
        <div className="search hidden sm:block">
            <input
                type="text"
                className="search__input form-control border-transparent"
                placeholder="Search..."
                @input="$emit('update:text', $event.target.value)"
            />
            <Icon
                icon="akar-icons:search"
                data-lucide="search"
                class="lucide lucide-search search__icon dark:text-slate-500"
            />
        </div>
        <a className="notification sm:hidden" href="">
            <Icon
                icon="akar-icons:search"
                data-lucide="search"
                className="notification__icon dark:text-slate-500"
            />
        </a>
    </div>
</template>
