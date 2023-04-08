<template>
  <div v-if="showNotification" id="toast-success" class="flex items-center w-full max-w-xs p-2 text-gray-800 bg-gray-200 rounded-lg shadow bg-opacity-75" role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-500 bg-green-100 rounded-lg">
      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
      <span class="sr-only">Check icon</span>
    </div>
    <div class="ml-3 text-sm font-normal">{{ message }}</div>
    <button @click="closeNotification()" type="button" class="ml-auto -mx-1.5 -my-1.5 bg-gray-200 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-300 inline-flex h-8 w-8" data-dismiss-target="#toast-success" aria-label="Close">
      <span class="sr-only">Close</span>
      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "ToastNotification",
  computed: {
    ...mapState({
      showNotification: state => state.showNotification,
      message: state=> state.showNotificationMessage
    }),
  },
  methods: {
    ...mapActions(['setShowNotification',]),
    closeNotification() {
      this.setShowNotification({show: false, message: ""});
    }
  }
}
</script>

<style scoped>

</style>