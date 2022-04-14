<template>
    <div class="category-container">
        <TaskCategory v-for="category in shareData.data" :key="category.id" :category="category"/>
    </div>
</template>

<script>
import TaskCategory from '../components/TaskCategory.vue'

import { store } from '../store.js'

export default {
    name: 'TaskHolder',
    components: {
		TaskCategory
    },
    data (){
        return { 
            shareData: store.state
        }
    }
}
</script>

<style scoped>
    .category-container{
        display: flex;
        padding-top: 120px;
        border-radius: 4px;
    }
</style>
