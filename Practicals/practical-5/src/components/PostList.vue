<template>
    <div>
        <PostItem v-for="(item, index) in posts" :key="index" :item="item"/>
    </div>
</template>

<script>
import PostItem from './Post.vue'

export default {
    name: 'PostsList',
    components: {
		PostItem
    },
    props: {
        posts: Object,
        userData: Object,
        userId: Number
    }
}
</script>

<style scoped>

</style>
