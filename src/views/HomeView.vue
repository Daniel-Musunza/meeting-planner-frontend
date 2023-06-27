<template>
  <div class="container">
    <h2 class="mt">Meeting Planner</h2>
    <h3  class="mt">Meetings</h3>

    <div v-if="tasks.length === 0" class="mt-4">
      <p>No tasks found.</p>
    </div>

    <ul v-else class="list-group mt-4">
      <li v-for="(task, index) in tasks" :key="index" class="list-group-item">
        <div class="list"  @click="toggleEdit">
          <div class="left-icon" > 
           <span> {{ index + 1 }}. </span>
          <a :href="task.link"> {{ task.title }} - <span style="color: rgb(52, 221, 52)">{{ task.platform }} </span></a>
          </div>
        
          <div class="right-icon">
          
            <span v-if="timeRemaining[index]">
              <span v-if="timeRemaining[index].days>0">{{ timeRemaining[index].days }} days</span>
              <span v-if="!timeRemaining[index].days&&timeRemaining[index].hours>0"> {{ timeRemaining[index].hours }} hrs</span>
              <span v-if="!timeRemaining[index].days&&!timeRemaining[index].hours&&timeRemaining[index].minutes>0">{{ timeRemaining[index].minutes }} min</span>
              <span v-if="!timeRemaining[index].days&&!timeRemaining[index].hours&&!timeRemaining[index].minutes&&timeRemaining[index].seconds>0">{{ timeRemaining[index].seconds }} sec</span>
              <span v-if="timeRemaining[index].seconds<0">Started</span>
            </span>
            <span>
              <i v-if="!edit" class="fa-solid fa-ellipsis-vertical">
               </i>
             <span class="trash" @click="toggleEdit"> <i class="fa-solid fa-trash-can" @click="deleteData(task)" v-if="edit"></i> </span>
            </span>
          </div>
        </div>
      </li>

    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
export default {
  data() {
    return {
      edit: null,
    };
  },
  methods: {
    toggleEdit(){
      this.edit= !this.edit;
    },
    updateTimeRemaining() {
      this.timer = setInterval(() => {
        this.getTasks();
      }, 1000);
    },
    async deleteData(task) {
    try {
      const response = await axios.delete(`http://localhost:3444/api/data/delete/${task.id}`);

      if (response.status === 200) {
        // Delete request was successful
        alert('Successfully deleted.');
        // Update the data in your Vue component after successful deletion if needed
      } else {
        // Delete request failed
        throw new Error('Delete request failed.');
      }
    } catch (error) {
      console.error(`Error is ${error}`);
      // Handle error scenario if necessary
    }
  },


    ...mapActions(['getTasks']),
  },
  computed: {
    ...mapState(['tasks']),
    timeRemaining() {
      const now = new Date();
      return this.tasks.map(task => {
        const taskDate = new Date(task.date + ' ' + task.time + ':00');
        if (isNaN(taskDate.getTime())) {
          return null;
        }
        const timeDiff = taskDate.getTime() - now.getTime();
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        return { days, hours, minutes, seconds };
      });
    },
  },
  created(){
    this.getTasks();
    this.updateTimeRemaining();
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.container{
  margin-top: 40px;
 
}
.list {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mt{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.right-icon {
  margin-left: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.left-icon {
  margin-right: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
span{
  color: rgb(32, 113, 244);
  padding-right: 10px;
}
.fa-solid{
  cursor: pointer;
}
.trash:hover {
  color: red;
}
h2{
  color:rgb(12, 113, 246);
  font-weight: 700;
  margin-bottom: 0;
}
/* Add any custom styles for the Planner component */
</style>
