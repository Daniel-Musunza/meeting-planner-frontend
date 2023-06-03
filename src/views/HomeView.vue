<template>
  <div class="container">
    <h1 class="mt-4">Planner</h1>

    <div v-if="tasks.length === 0" class="mt-4">
      <p>No tasks found.</p>
    </div>

    <ul v-else class="list-group mt-4">
      <li v-for="task in tasks" :key="task.id" class="list-group-item">
        {{ task.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        { id: 1, title: 'Full Stack Development- Zoom' },
        { id: 2, title: 'Interview Walk Though- G0ogle meet' },
        { id: 3, title: 'Mpesa Integration- Zoom' },
      ],
    };
  },
};
</script>

<style scoped>
.container{
  margin-top: 40px;
}
/* Add any custom styles for the Planner component */
</style>
