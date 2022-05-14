/*Francois Smith u21649988*/
/*Changed clicking on category itself to a button called set active as it felt more natural to me*/
<template>
    <div class="task-category">
        <div class="category-header">
            <h2>{{category.title}} Tasks</h2>
            <button v-if="category.active">Active</button>
            <button v-else @click="setActive(category.id)">Set Active</button>
        </div>
        <div class="tasks-container">
            <TaskItem v-for="(task,index) in category.task" :key="index" :task="task" :category="category"/>
        </div>
    </div>
</template>

<script>
import TaskItem from '../components/TaskItem.vue'
import {store} from '../store.js'

export default {
    name: 'TaskCategory',
    components: {
		TaskItem
    },
    props: ['category'],
    methods: {
        setActive(categoryID){
            store.setActiveCategory(categoryID);
        }
    }
}
</script>

<style scoped>
    .task-category{
        padding-top: 20px;
        padding-bottom: 20px;
        min-height: 75vh;
        width: 350px;
        background-color: #2e2e2e;
        margin: 20px 30px;
        border-radius: 8px;
    }

    .category-header{
        position: relative;
        margin: 10px 25px;
        padding-bottom: 20px;
        font-weight: 300;
        display: flex;
        align-items: center;
        justify-content: space-between;
        word-break: break-all;
    }

    .category-header button{
        background-color: #0840a8;
        border-radius: 4px;
        border: none;
        color: rgb(250, 237, 237);
        padding: 5px 10px;
        font-size: 17px;
        word-break: keep-all;
    }

    .category-header::after{
        content : "";
        position : absolute;
        width : 100%;
        height : 3px;
        background-color: #0840a8;
        bottom: 0;
        left: 0;
        margin-bottom: 10px;
        margin-top: 10px;
    }

    .tasks-container{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
