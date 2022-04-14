/*Francois Smith u21649988*/
<template>
    <div ref="currentTask" class="task">
        <textarea ref="taskName" :value=task.details class="task-name" disabled="disabled"/>
        <div class="task-button-container">
            <button @click="deleteTask(task, category)" class="task-delete">Delete</button>
            <button class="task-edit" v-if="!editable" @click="editTask()">Edit</button>
            <button class="task-edit" v-else @click="updateTask(task, category)">Save</button>
        </div>
    </div>
</template>

<script>
import {store} from '../store.js'

export default {
    name: 'TaskItem',
    props: {
        task: Object,
        category: Object,  
    },
    data(){
        return{
            editable: false
        }
    },
    methods:{
        deleteTask(task, category){
            store.deleteTask(task, category);
        },
        editTask(){
            this.$refs.taskName.disabled = false;
            this.$refs.taskName.classList.add("enabled");
            this.editable = true;
        },
        updateTask(task, category){
            this.$refs.taskName.disabled = true;
            this.$refs.taskName.classList.remove("enabled");

            this.$refs.taskName.setAttribute('style', 'height:' + (this.$refs.taskName.scrollHeight) + 'px;overflow-y:hidden;');
            this.$refs.taskName.addEventListener('input', function () {
                this.$refs.taskName.style.height = 'auto';
                this.$refs.taskName.style.height = (this.scrollHeight) + 'px';
            });

            this.editable = false;
            let updatedTask = task;
            updatedTask.details = this.$refs.taskName.value;
            store.updateTask(task, updatedTask, category);
        }
    }
}
</script>

<style scoped>
    .task{
        width: 300px;
        min-height: 180px;
        background-color: #242424;
        border-radius: 4px;
        padding: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 15px;
    }
    
    .task-name{
        font-weight: 500;
        font-size: 22px;
        margin-bottom: 20px;
    }
    
    .task-button-container{
        display: flex;
        justify-content: space-between;
    }

    button{
        width: 45%;
        border-radius: 4px;
        border: none;
        padding: 10px;
        color: rgb(250, 237, 237);
        font-size: 16px;
        z-index: 30;
    }
     
    .task-delete{
        background-color: #941818;
    }
    
    .task-edit{
        background-color: #0840a8;
    }

    .enabled{
        border: 1px rgb(250, 237, 237) solid;
        border-radius: 4px;
        padding: 5px;
    }

    textarea{
        border: none;
        background-color: #242424;
        color: rgb(250, 237, 237);
        resize: vertical;
        height: auto;
        resize: none;
        overflow: auto;
    }
</style>
