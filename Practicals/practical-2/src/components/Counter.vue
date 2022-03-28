<template>
    <div>
        <h1 v-bind:class="{liked: isActive}">{{value}}</h1>
    </div>
</template>

<script>
export default {
    name: 'CounterComponent',
    props: {
        value: Number,
        isActive: Boolean
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;1,100;1,200;1,300&display=swap');

    h1{
        font-family: Montserrat, sans-serif;
        font-size: 40px;
        font-weight: 400;
        color: #ed4d4d;
        margin: 0px;
    }

    .liked{
        color: #63b34f;
    }
</style>
