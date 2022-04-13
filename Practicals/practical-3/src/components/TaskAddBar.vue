<template>
    <div class="top-bar-container">
        <input id="element-to-add" type="text">
        <div>
            <button>+ Add Task</button>
        <button>+ Add Category</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TaskAddBar',

}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;1,100;1,200;1,300&display=swap');
    .top-bar-container{
        z-index: 20;
        position: fixed;
        top: 0px;
        height: 80px;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #F9F9F9;
    }

    button{
        background-color: #1453c9;
        color: #fff;
        padding: 14px;
        font-size: 20px;
        border: none;
        border-radius: 4px;
        margin-left: 20px;
        cursor: pointer;
    }

    input{
        color: #292929;
        padding: 14px;
        font-size: 20px;
        border: 1px solid #292929;
        border-radius: 4px;
        width: 60%;
    }
</style>
