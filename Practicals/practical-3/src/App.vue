<template>
    <div>
        <TaskAddBar/>
	    <TaskHolder/>
    </div> 
</template>

<script>
import TaskHolder from './components/TaskHolder.vue'
import TaskAddBar from './components/TaskAddBar.vue'
import TaskItem from './components/TaskItem.vue'
import TaskCategory from './components/TaskCategory.vue'

export default {
	name: 'App',
	components: {
		TaskHolder,
        TaskAddBar,
        TaskItem,
        TaskCategory
    }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;1,100;1,200;1,300&display=swap');
    :root{
        --font-color: #292929;
        --background-color: #F9F9F9;
        --accent-color: #4483F7;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    html {
        scroll-behavior: smooth;
        position: absolute;
    }
    
    body {
        min-height: 100vh;
        color: var(--font-color);
        background-color: var(--background-color);
        font-family: 'Montserrat', sans-serif;
        min-width: 100vw;
    }
</style>
