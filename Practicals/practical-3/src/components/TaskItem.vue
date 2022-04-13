<template>
    <div class="task">
        <div class="task-name">Test</div>
        <div class="task-button-container">
            <button class="task-delete">Delete</button>
            <button class="task-edit">Edit</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TaskItem',
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300&display=swap');
    .task{
        width: 300px;
        height: 180px;
        background-color: #F9F9F9;
        border-radius: 4px;
        padding: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    
    .task-name{
        font-weight: 500;
        font-size: 22px;
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
        color: #fff;
        font-size: 16px;
    }
     
    .task-delete{
        background-color: #ac2f2f;
    }
    
    .task-edit{
        background-color: #1453c9;
    }
</style>
