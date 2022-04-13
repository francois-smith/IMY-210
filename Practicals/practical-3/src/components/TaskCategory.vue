<template>
    <div class="task-category">
        <div class="category-header">
            <h2>Test</h2>
        </div>
        <div class="tasks-container">
            <TaskItem/>
        </div>
    </div>
</template>

<script>
import TaskItem from '../components/TaskItem.vue'

export default {
    name: 'TaskCategory',
    components: {
		TaskItem
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;1,100;1,200;1,300&display=swap');
    :root{
        --font-color: #292929;
        --background-color: FFFFFF;
        --accent-color: #1453c9;
    }

    .task-category{
        padding-top: 20px;
        min-height: 80vh;
        background-color: #FFFFFF;
        margin: 20px 30px;
    }

    .category-header{
        position: relative;
        margin: 10px 25px;
        padding-bottom: 20px;
        font-weight: 300;
    }

    .category-header::after{
        content : "";
        position : absolute;
        width : 100%;
        height : 3px;
        background-color: #1453c9;
        bottom: 0;
        left: 0;
        margin-bottom: 10px;
        margin-top: 10px;
    }

    .tasks-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 350px;
    }
</style>
