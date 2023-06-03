<template>
    <div>
      <h1>Create Meeting</h1>
  
      <form @submit.prevent="createMeeting">
        <div>
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="meeting.title" required>
        </div>
  
        <div>
          <label for="date">Date:</label>
          <input type="date" id="date" v-model="meeting.date" required>
        </div>
  
        <div>
          <label for="time">Time:</label>
          <input type="time" id="time" v-model="meeting.time" required>
        </div>
  
        <div>
          <button type="submit">Create Meeting</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        meeting: {
          title: '',
          date: '',
          time: '',
        },
      };
    },
    methods: {
      createMeeting() {
        // Handle meeting creation logic here
        console.log('Meeting created:', this.meeting);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any custom styles for the MeetingForm component */
  </style>
  