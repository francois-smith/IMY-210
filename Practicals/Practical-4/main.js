//u21649988 - Francois Smith

const state = {
    users: ["John", "Moe"],
    messages: ["Hey Whats up?"],
    timestamps: ["12:44"]
}

const mutations = {
    ADD_MESSAGE(state, message){
        state.messages.push(message);
    },
    ADD_TIMESTAMP (state, time){
        state.timestamps.push(time);
    },
    ADD_USER (state, user){
        state.users.push(user);
    }
}

const actions = {
    addMessage(context, message){
        context.commit('ADD_MESSAGE', message);
    },
    addTimestamp(context, time){
        context.commit('ADD_TIMESTAMP', time);
    },
    addUser(context, user){
        context.commit('ADD_USER', user);
    }
}

const getters = {
    getMessages(state){
        return state.messages;
    },
    getTimestamps(state){
        return state.timestamps;
    },
    getUsers(state){
        return state.users;
    }
}

const store = Vuex.createStore({
    state,
    mutations,
    actions,
    getters
})

const inputComponent = {
    template: '<input v-model="message" type="text" @keyup.enter="sendMessage"/>',
    data(){
        return {
            message:''
        }
    },
    methods:{
        sendMessage(){
            this.$store.dispatch('addMessage', this.message);
            const date = new Date();
            let time = date.getHours()+":"+date.getMinutes();
            this.$store.dispatch('addTimestamp', time);
            this.message = '';
        }
    }
}

const app = Vue.createApp({
    computed:{
        getUsers(){
            return this.$store.getters.getUsers;
        },
        getMessages(){
            return this.$store.getters.getMessages;
        },
        getTimestamps(){
            return this.$store.getters.getTimestamps;
        }
    },
    components:{
        'input-component': inputComponent,
    },
});

app.use(store);
app.mount("#app");