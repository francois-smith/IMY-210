<template>
	<div>
		<h1>Search for user</h1>
		<input type="number" v-model="userId"/>
		<select v-model="dataSet">
			<option>User Information</option>
			<option>User Posts</option>
			<option>User Todo</option>
		</select>
		<button v-on:click="search">Search</button>
		<UsersList :userData="userData" :userId="userId"/>
		<TodoList :todos="todos" :userId="userId" :userData="userData"/>
		<PostsList :posts="posts" :userId="userId" :userData="userData"/>
		<h1>{{this.errorResponse}}</h1>
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
					return;
				}
				this.userData = data;
				this.posts = {};
				this.todos = {};
				this.errorResponse = "";
			})

		},
		getPosts: function(){
			let url = "https://jsonplaceholder.typicode.com/posts?userId="+this.userId;
			fetch(url).then(async response=>{
				const data = await response.json();
				if(!response.ok || Object.keys(data).length === 0) {
					this.errorResponse = "User not Found";
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
	}
</style>
