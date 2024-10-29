<template>
    <div class="w-full flex items-center justify-center p-5">
        <div class="w-1/3">
            <h1 class="text-2xl mt-5 mb-24 w-full text-center">Todo App</h1>
            <!-- Input -->
            <div class="flex gap-2 justify-center">
                <InputText type="text" size="normal" class="w-full" placeholder="Enter Todo" v-model="draftTodo" />
                <LButton @click="addTodo" size="normal" class="min-w-fit"><i class="pi pi-plus mr-1"
                        style="font-size: 1rem"></i>Add
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
            data: [
                {
                    id: 1,
                    title: 'Todo 1',
                    completed: false,
                },
                {
                    id: 2,
                    title: 'Todo 2',
                    completed: true,
                },
                {
                    id: 3,
                    title: 'Todo 3',
                    completed: false,
                },
            ],
        }
    },
    methods: {
        addTodo() {
            // alert(this.draftTodo)
            this.data.push({
                id: this.data.length + 1,
                title: this.draftTodo,
                completed: false,
            })
            this.draftTodo = ''
        },
    },
}
</script>
