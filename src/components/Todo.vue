<template>
    <div
        class="border-2 border-gray-600 p-2 rounded-md hover:border-primary-500 cursor-pointer flex items-center justify-between">
        <p :class="{
            'line-through': completed
        }">{{ title }}</p>
        <LButton size="small" class="min-w-[140px]" v-if="completed" severity="warn" @click="setStatus(false)"
            :loading="isLoading">Mark as
            Pending</LButton>
        <LButton size="small" class="min-w-[140px]" v-else @click="setStatus(true)" :loading="isLoading">Mark as
            Completed</LButton>

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
    data() {
        return {
            isLoading: false,
        }
    },
    methods: {
        async setStatus(isCompleted) {
            this.isLoading = true;
            try {
                await this.$pb.collection('todos').update(this.id, {
                    "completed": isCompleted
                });
            } catch (error) {
                alert(error.response?.message ?? "Unknown Error")
            } finally {
                this.isLoading = false;
            }
        }
    }
}
</script>