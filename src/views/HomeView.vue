<template>
  <div class="container">
    <h1 class="mt">Meeting Planner</h1>

    <div v-if="tasks.length === 0" class="mt-4">
      <p>No tasks found.</p>
    </div>

    <ul v-else class="list-group mt-4">
      <li v-for="(task, index) in tasks" :key="index" class="list-group-item">
        <div class="list" >
          <div  @click="toggleEdit">{{ index + 1 }}. {{ task.title }}</div>
        
          <div class="right-icon">
           <span> {{ task.timeRemaining }} </span>
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
export default {
  data() {
    return {
      tasks: [
        { id: 1, title: 'Full Stack Development- Zoom' , timeRemaining: 34},
        { id: 2, title: 'Interview Walk Through- Google meet', timeRemaining: 12 },
        { id: 3, title: 'Mpesa Integration- Zoom', timeRemaining: 56 },
      ],
      edit: null,
    };
  },
  methods: {
    toggleEdit(){
      this.edit= !this.edit;
    },
  }
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
