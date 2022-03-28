<!--u21649988 Francois Smith-->
<template>
	<div id="mainContainer">
		<div id="contentContainer">
			<div id="counterContainer">
				<Counter :value="value" :isActive="liked"></Counter>
			</div>
			<div id="buttonContainer">
				<LikeButton :like="likeFunction"/>
				<DislikeButton :dislike="dislikeFunction"/>
			</div>
		</div>
	</div>
</template>

<script>
import DislikeButton from './components/DislikeButton.vue'
import Counter from './components/Counter.vue'
import LikeButton from './components/LikeButton.vue'

export default {
    name: 'App',
    components:{
		Counter,
		LikeButton,
		DislikeButton
    },
    data(){
        return{
            value: 0,
			liked: true
        }
    },
    methods:{
        dislikeFunction(){
            this.value--;
			this.liked = false;
        },
        likeFunction(){
            this.value++;
			this.liked = true;
        }
    }
}
</script>

<style>
	#buttonContainer{
		display: flex;
	}

	#mainContainer{
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	#contentContainer{
		width: 220px;
		height: 200px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 3px #333 solid;
		border-radius: 30px;
		position: relative;
		background-color: rgb(236, 236, 236);
	}

	#counterContainer{
		position: relative;
		width: 100%;
		text-align: center;
		border: 3px #333 solid;
		background-color: #fff;
	}
</style>
