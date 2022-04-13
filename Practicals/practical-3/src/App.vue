<template>
    <div>
        <TaskAddBar/>
        <TaskHolder/>
    </div> 
</template>

<script>
import TaskHolder from './components/TaskHolder.vue'
import TaskAddBar from './components/TaskAddBar.vue'

export default {
	name: 'App',
	components: {
		TaskHolder,
        TaskAddBar
    }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;1,100;1,200;1,300&display=swap');
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
        color: #292929;
        background-color: #F9F9F9;
        font-family: 'Montserrat', sans-serif;
        min-width: 100vw;
    }
</style>
