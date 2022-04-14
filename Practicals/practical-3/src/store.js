import {taskData} from "./data.js"
import {reactive} from 'vue';

export const store = {
    state: {
        data: reactive(taskData),
    },
    getActiveCategory(){
        return this.state.data.find((category)=>category.active);
    },
    setActiveCategory(categoryID){
        this.state.data.map((category)=>{
            if(category.id === categoryID){
                category.active = true;
            }
            else{
                category.active = false;
            }
        });
    },
    addTask(newTask){
        const currentCategory = this.getActiveCategory();
        currentCategory.task.push({"details":newTask});
    },
    addCategory(newCategory){
        this.state.data.push({id:this.state.data.length+1, title:newCategory, task:[], active:false});
    },
    deleteTask(task, category){
        let removeCategory = this.state.data.find((categoryFilter)=>categoryFilter.id === category.id);

        removeCategory.task.find((taskFilter)=>{
            if(taskFilter === task){
                removeCategory.task.splice(taskFilter, 1);
                return;
            }
        });
    },
    updateTask(oldTask, updatedTask, category){
        console.log(updatedTask);
        console.log(oldTask);
        let updateCategory = this.state.data.find((categoryFilter)=>categoryFilter.id === category.id);

        updateCategory.task.find((taskFilter)=>{
            if(taskFilter === oldTask){
                taskFilter = updatedTask;
                return;
            }
        });

        console.log(this.state.data);
    }
}