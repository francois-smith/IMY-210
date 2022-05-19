<template>
    <div v-if="!(Object.keys(posts).length === 0)">
        <hr/>
        <div class="post-container">
            <h2>User Posts</h2>
            <PostItem v-for="(item, index) in posts" :key="index" :item="item"/>
        </div>
        
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
    hr{
        margin-top: 20px;
    }
    .post-container h2{
        text-align: center;
        font-size: 22px;
        margin: 0px;
        padding: 0px;
        color: #3878cc;
    }
</style>
