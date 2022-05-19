<template>
	<div class="main-container">
		<div class="inner-container">
			<div>
				<h1 class="header">Search For User Data</h1>
			</div>
			<hr/>
			<div class="user-inputs">
				<div>
					<select @change="search" v-model="dataSet">
						<option>User Information</option>
						<option>User Posts</option>
						<option>User Todo</option>
					</select>
				</div>
				<div>
					<input type="number" v-on:input="search" v-model="userId"/>
				</div>
			</div>
			<UsersList @update="updateUser" :userData="userData" :userId="userId"/>
			<TodoList :todos="todos" :userId="userId" :userData="userData"/>
			<PostsList :posts="posts" :userId="userId" :userData="userData"/>
			<h1 class="search-error">{{this.errorResponse}}</h1>
		</div>
	</div>
</template>

<script>
	import UsersList from './components/User.vue'
	import TodoList from './components/TodoList.vue'
	import PostsList from './components/PostList.vue'

	export default {
	name: 'App',
	components: {
		UsersList,
		TodoList,
		PostsList
	},
	data(){
		return {
			userId: 0,
			userData: {},
			todos: {},
			posts: {},
			dataSet: "User Information",
			errorResponse: ""
		}
	},
	methods:{
		search: function(){
			switch(this.dataSet){
				case "User Information":
					this.getUser();
					break;
				case "User Posts":
					this.getPosts();
					break;
				case "User Todo":
					this.getTodo();
					break;
			}
		},

		getUser: function() {
			let url = "https://jsonplaceholder.typicode.com/users/"+this.userId;
			fetch(url).then(async response=>{
				const data = await response.json();
				if(!response.ok || data === {}) {
					this.errorResponse = "User not Found";
					this.posts = {};
					this.todos = {};
					this.userData = {};
					return;
				}
				this.userData = data;
				this.posts = {};
				this.todos = {};
				this.errorResponse = "";
				document.querySelector("#response-message").classList.remove("success");
			})

		},
		updateUser: function(data) {
			this.userData = data;
		},
		getPosts: function(){
			let url = "https://jsonplaceholder.typicode.com/posts?userId="+this.userId;
			fetch(url).then(async response=>{
				const data = await response.json();
				if(!response.ok || Object.keys(data).length === 0) {
					this.errorResponse = "User not Found";
					this.posts = {};
					this.todos = {};
					this.userData = {};
					return;
				}
				console.log(typeof data);
				this.posts = data;
				this.userData = {};
				this.todos = {};
				this.errorResponse = "";
			});
		},
		getTodo: function(){
			let url = "https://jsonplaceholder.typicode.com/todos?userId="+this.userId;
			fetch(url).then(async response=>{
				const data = await response.json();
				if(!response.ok || Object.keys(data).length === 0) {
					this.errorResponse = "User not Found";
					this.posts = {};
					this.todos = {};
					this.userData = {};
					return;
				}
				this.todos = data;
				this.userData = {};
				this.posts = {};
				this.errorResponse = "";
			});
		}
	}
	}
</script>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

	*{
		font-family: "Montserrat", sans-serif;
		margin: 0px;
		overflow-x: hidden;
	}
	.main-container{
		display: flex;
		justify-content: center;
		width: 100vw;
		min-height: 100vh;
		padding: 50px;
		background-color: rgb(245, 245, 245);
		margin: 0px;
	}
	.inner-container{
		width: 600px;
		padding: 20px;
		background-color: #fff;
		border-radius: 20px;
	}
	.header{
		text-align: center;
		color: #3878cc;
		padding: 10px
	}
	hr{
		margin-bottom: 20px;
		color: #3878cc;
	}
	.user-inputs{
		display: flex;
		width: 100%
	}
	.user-inputs div{
		width: 50%;
	}
	.user-inputs div input, .user-inputs div select{
		width: 95%;
		padding: 5px;
	}
	.search-error{
		padding-top: 50px;
		text-align: center;
		text-decoration: underline;
		color: #3878cc;
		font-size: 35px;
	}
	.blue{
		color: #3878cc;
	}
</style>
