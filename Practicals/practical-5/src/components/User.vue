<template>
    <div v-if="!(Object.keys(userData).length === 0)">
        <hr/>
        <div class="user-info">
            <div class="data">
                <h2>User Information</h2>
                <h4><span class="blue">Name:</span> {{userData.name}}</h4>
                <h4><span class="blue">Username:</span> {{userData.username}}</h4>
            </div>
            <div class="inputs">
                <label>New Name: 
                    <input v-model="nameField" type="text">
                </label>
                <label>New Username: 
                    <input v-model="userField" type="text">
                </label>
                <div>
                    <button @click="updateInfo">Update Information</button>
                    <span id="response-message">Success</span>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
    export default {
        name: 'UsersList',
        props: {
            userData: Object,
            userId: Number
        },
        data(){
            return{
                nameField: "",
                userField: ""
            }  
        },
        methods: {
            updateInfo: function(){
                const requestOptions = {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: this.nameField, username: this.userField })
                };
                console.log(requestOptions.body);

                fetch("https://jsonplaceholder.typicode.com/users/"+this.userId, requestOptions)
                .then(async response => {
                    const data = await response.json();
                    this.$emit('update', data)
                    this.nameField = "";
                    this.userField = "";
                    document.querySelector("#response-message").classList.add("success");
                });
            }
        }
    }
</script>

<style scoped>
    hr{
        margin-top: 20px;
    }
    h4{
        font-weight: 300;
        margin-top: 6px;
        margin-bottom: 0px;
        padding: 0px;
    }
    .inputs{
        display: flex;
        flex-direction: column;
    }
    button{
        margin-top: 10px;
        width: 100%;
        background: #3878cc;
        border: none;
        padding: 3px 5px;
        border-radius: 5px;
        color: #fff;
    }
    label{
        padding: 5px;
    }
    .inputs span{
        display: none;
    }
    .inputs{
        padding-left: 20px;
        border-left: 2px solid #3878cc;
    }
    .success{
        color: rgb(86, 165, 49);
        padding-left: 10px;
        display: inline;
    }
    .user-info{
        display: flex;
        justify-content: space-between;
    }
    .data h2{
        padding-bottom: 10px;
    }
</style>
