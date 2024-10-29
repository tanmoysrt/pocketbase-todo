<template>
    <div
        class="border-2 border-gray-600 p-2 rounded-md hover:border-primary-500 cursor-pointer flex items-center justify-between">
        <p :class="{
            'line-through': completed
        }">{{ title }}</p>
        <LButton size="small" class="min-w-[140px]" v-if="completed" severity="warn">Mark as Pending</LButton>
        <LButton size="small" class="min-w-[140px]" v-else>Mark as Completed</LButton>

    </div>
</template>
<script>
import Button from 'primevue/button'


export default {
    name: "TodoRecord",
    props: ["id", "title", "completed"],
    components: {
        LButton: Button,
    },
}
</script>