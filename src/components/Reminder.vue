<template>
<div class="container">
    <h1 class="mt-4">Create Reminder</h1>

    <form @submit.prevent="createReminder" class="mt-4">
      <div class="mb-3">
        <label for="title" class="form-label">Title:</label>
        <input type="text" id="title" v-model="reminder.title" required class="form-control">
      </div>

      <div class="mb-3">
        <label for="date" class="form-label">Date:</label>
        <input type="date" id="date" v-model="reminder.date" required class="form-control">
      </div>

      <div class="mb-3">
        <label for="time" class="form-label">Time:</label>
        <input type="time" id="time" v-model="reminder.time" required class="form-control">
      </div>

      <div>
        <button type="submit" class="btn btn-primary">Create Reminder</button>
      </div>
    </form>
  </div>
</template>

  <script>
  export default {
    data() {
      return {
        reminder: {
          title: '',
          date: '',
          time: '',
        },
      };
    },
    methods: {
      createReminder() {
        // Handle reminder creation logic here
        console.log('Reminder created:', this.reminder);
      },
    },
  };
  </script>
  
  <style scoped>
  .container{
  margin-top: 40px;
}
  
.btn{
    align-content: center;
}
  /* Add any custom styles for the ReminderForm component */
  </style>
  