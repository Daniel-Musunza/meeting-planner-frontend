<template>
  <Header></Header>
  <ModalItem v-show="modalActive" :modalMessage="modalMessage" @close="closeModal" />
  <router-view/>
</template>
<script>
import Header from "@/components/Header"
import ModalItem from "@/components/ModalItem";
import { mapState, mapActions } from 'vuex';
export default {
  components: {
    Header,
    ModalItem
  },
  data() {
  return {
    modalActive: null,
    modalMessage: "",
  };
},

  methods: {
    closeModal() {
        this.modalActive = !this.modalActive;
      },
      ...mapActions(['getTasks']),
  },
  computed: {
    ...mapState(['tasks']),
    modalMessage() {
      const now = new Date();

      const hasMeeting = this.tasks.some(task => {
        const taskDate = new Date(task.date + ' ' + task.time + ':00');
        const timeDiff = taskDate.getTime() - now.getTime();
        const hoursRemaining = Math.floor(timeDiff / (1000 * 60 * 60));

        return hoursRemaining < 24 && now.getHours() === 16 && now.getMinutes() === 2;
      });

      const inFiveMinutes = this.tasks.some(task => {
        const taskDate = new Date(task.date + ' ' + task.time + ':00');
        const timeDiff = taskDate.getTime() - now.getTime();
        const minutesRemaining = Math.floor(timeDiff / (1000 * 60));

        return minutesRemaining === 5;
      });

      if (hasMeeting) {
        this.modalActive = true;
        return this.modalMessage = 'You have a meeting today';
      } else if (inFiveMinutes) {
        this.modalActive = true;
        return this.modalMessage = 'A meeting is about to start in the next 5 minutes';
      }

      this.modalActive = false;
      return '';
    }

  },
  created(){
    this.getTasks();
  },
}
</script>
<style>

</style>
