<template>
    <div class="post">
        <span class="post-id">#{{item.id}} </span>
        <h1 v-bind="title" class="post-title">{{item.title}}</h1>
        <p class="post-body">{{item.body}}</p>
    </div>
</template>

<script>
export default {
    name: 'PostItem',
    props: {
        item: Object
    },
    methods: {
        update: function(){
            
        }
    }
}
</script>

<style scoped>
    .post{
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
        padding: 10px 20px;
        margin-top: 10px;
        position: relative;
    }

    .post-body{
        padding: 4px;
        border: none;
        width: 100%;
        resize: none;
        margin-top: 2px;
    }

    .post-id{
        position: absolute;
        top: 15px;
        right: 15px;
    }

    .post-title{
        font-size: 20px;
        font-weight: 400;
        color: #3878cc;
        width: 100%;
        border: none;
        padding: 4px;
    }
</style>
