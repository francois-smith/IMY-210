<template>
    <div class="top-bar-container">
        <div id="active-container">
            <div>Currently Adding To</div>
            <div class="active-text">{{getActive.title}} Tasks</div>
        </div>
        <input placeholder="Please Enter Value" id="element-to-add" type="text" v-model="newInput">
        <div>
            <button @click="addTask(newInput)">+ Add Task</button>
            <button @click="addCategory(newInput)">+ Add Category</button>
        </div>
    </div>
</template>

<script>
import { store } from '../store.js'

export default {
    name: 'TaskAddBar',
    methods:{
        addTask(newInput){
            if(newInput != ""){
                store.addTask(newInput);
                this.newInput = "";
            }
        },
        addCategory(newInput){
            if(newInput != ""){
                store.addCategory(newInput);
                this.newInput = "";
            }
        }
    },
    computed:{
        getActive(){
            return store.getActiveCategory();
        }
    },
    data(){
        return {
            newInput: "",
        }
    }
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
        background-color: #242424;
    }

    button{
        background-color: #0840a8;
        color: rgb(250, 237, 237);
        padding: 14px;
        font-size: 20px;
        border: none;
        border-radius: 4px;
        margin-left: 20px;
        cursor: pointer;
    }

    input{
        color: rgb(250, 237, 237);
        padding: 14px;
        font-size: 20px;
        border: 1px solid rgb(250, 237, 237);
        border-radius: 4px;
        width: 60%;
        background-color: #242424;
    }

    #active-container{
        text-align: center;
        padding: 0px 20px;
        font-size: 18px;
    }

    .active-text{
        color: rgb(250, 237, 237);
        background-color: #0840a8;
        padding: 4px;
        border-radius: 4px;
    }
</style>
