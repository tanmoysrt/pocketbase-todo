<template>
    <div class="w-full flex items-center justify-center p-5">
        <div class="w-1/3">
            <div class="w-full flex flex-row justify-between mt-5 mb-24">
                <h1 class="text-2xl">Todo App</h1>
                <p>{{ $pb.authStore?.model?.name ?? "Anonymous" }}</p>
            </div>
            <!-- Input -->
            <div class="flex gap-2 justify-center">
                <InputText type="text" size="normal" class="w-full" placeholder="Enter Todo" v-model="draftTodo"
                    :readonly="isSubmitting" />
                <LButton @click="addTodo" size="normal" class="min-w-fit" :loading="isSubmitting"><i
                        class="pi pi-plus mr-1" style="font-size: 1rem"></i>Add
                    New
                    Todo</LButton>
            </div>
            <!-- Todo list -->
            <div class="flex flex-col mt-10 gap-2">
                <Todo v-for="record in data" v-bind:key="record.id" :id="record.id" :title="record.title"
                    :completed="record.completed" />
            </div>
        </div>
    </div>
</template>
<script>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Todo from '@/components/Todo.vue'

export default {
    name: 'TodoPage',
    components: {
        InputText,
        LButton: Button,
        Todo,
    },
    data() {
        return {
            draftTodo: '',
            isSubmitting: false,
            data: [],
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        async addTodo() {
            if (!this.draftTodo) {
                alert("Please enter a valid title")
                return
            }
            this.isSubmitting = true;
            try {
                await this.$pb.collection('todos').create({
                    "title": this.draftTodo,
                    "completed": false,
                    "user": this.$pb.authStore.model.id
                });
                this.draftTodo = '';
            } catch (error) {
                alert(error.response?.message ?? "Unknown error");
            } finally {
                this.isSubmitting = false;
            }
        },
        async loadData() {
            try {
                const records = await this.$pb.collection('todos').getFullList({
                    sort: '-created',
                });
                this.data = records;
            } catch (error) {
                alert(error.response?.message ?? "Unknown error");
            }
        }
    },
}
</script>
