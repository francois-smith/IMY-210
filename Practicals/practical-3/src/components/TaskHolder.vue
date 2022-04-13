<template>
    <div class="category-container">
        <TaskCategory/>
        <TaskCategory/>
    </div>
</template>

<script>
import TaskCategory from '../components/TaskCategory.vue'

export default {
    name: 'TaskHolder',
    components: {
		TaskCategory
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;1,100;1,200;1,300&display=swap');
    :root{
        --font-color: #292929;
        --background-color: ;
        --accent-color: #1453c9;
    }

    .category-container{
        display: flex;
        padding-top: 120px;
        border-radius: 4px;
    }
</style>
