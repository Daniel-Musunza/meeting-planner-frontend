<template>
  <div class="container">
    <h1 class="mt">Meeting Planner</h1>
    <ModalItem v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal"/>
    <h3  class="mt">Meetings</h3>

    <div v-if="tasks.length === 0" class="mt-4">
      <p>No tasks found.</p>
    </div>

    <ul v-else class="list-group mt-4">
      <li v-for="(task, index) in tasks" :key="index" class="list-group-item">
        <div class="list" >
          <div  @click="toggleEdit"> {{ index + 1 }}.   <a :href="task.link"> {{ task.title }} - <span style="color: rgb(52, 221, 52)">{{ task.platform }} </span></a></div>
        
          <div class="right-icon">
          
            <span v-if="timeRemaining[index]">
              <span v-if="timeRemaining[index].days>0">{{ timeRemaining[index].days }} days</span>
              <span v-if="!timeRemaining[index].days&&timeRemaining[index].hours>0"> {{ timeRemaining[index].hours }} hrs</span>
              <span v-if="!timeRemaining[index].days&&!timeRemaining[index].hours&&timeRemaining[index].minutes>0">{{ timeRemaining[index].minutes }} min</span>
              <span v-if="!timeRemaining[index].days&&!timeRemaining[index].hours&&!timeRemaining[index].minutes&&timeRemaining[index].seconds>0">{{ timeRemaining[index].seconds }} sec</span>
              
            </span>
            <span v-if="!timeRemaining[index].seconds">meeting Started</span>
              <i @click="toggleEdit" v-if="!edit" class="fa-solid fa-ellipsis-vertical">
               </i>
              <i class="fa-regular fa-pen-to-square"  v-if="edit"></i>
              <i class="fa-solid fa-trash-can"  v-if="edit"></i>
          </div>
        </div>
      </li>

    </ul>
  </div>
</template>

<script>
 import ModalItem from "@/components/ModalItem";
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {
      edit: null,
      modalActive: true,
      modalMessage: "",
    };
  },
  components: {
        ModalItem
      },
  methods: {
    toggleEdit(){
      this.edit= !this.edit;
    },
    closeModal() {
        this.modalActive = !this.modalActive;
      },
    updateTimeRemaining() {
      this.timer = setInterval(() => {
        this.getTasks();
      }, 1000);
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
    modalMessage() {
      const now = new Date();

      const hasMeeting = this.tasks.some(task => {
        const taskDate = new Date(task.date + ' ' + task.time + ':00');
        const timeDiff = taskDate.getTime() - now.getTime();
        const hoursRemaining = Math.floor(timeDiff / (1000 * 60 * 60));

        return hoursRemaining < 24 && now.getHours() === 17 && now.getMinutes() === 49;
      });

      if (hasMeeting) {
        this.modalActive = true;
        return this.modalMessage = "You have a meeting today!!";
      }

      
      return  this.modalMessage = "You have a meeting today!!";
    }

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
}
span{
  color: rgb(32, 113, 244);
  padding-right: 10px;
}

/* Add any custom styles for the Planner component */
</style>
