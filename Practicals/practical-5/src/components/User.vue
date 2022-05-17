<template>
    <div>
        <h2>{{userData.name}}</h2>
        <h2>{{userData.username}}</h2>
    </div>
</template>

<script>
export default {
    name: 'UsersList',
    props: {
        userData: Object,
        userId: Number
    }
}
</script>

<style scoped>

</style>
