<template>
    <div>
        <TodoItem v-for="(item, index) in todos" :key="index" :item="item"/>
    </div>
</template>

<script>
import TodoItem from './Todo.vue'

export default {
    name: 'TodoList',
    components: {
		TodoItem
    },
    props: {
        todos: Object,
        userData: Object,
        userId: Number
    }
}
</script>

<style scoped>

</style>
