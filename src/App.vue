<template>
  <div class="min-w-full">
    <ToastNotification class="z-[100] fixed translate-y-1/2 right-0 top-0"></ToastNotification>
    <div class="wrapper">
      <Form/>
    </div>
  </div>
</template>

<script>
import Form from './components/forms/Form.vue'
import ToastNotification from "@/components/notifications/ToastNotification.vue";

export default {
  name: "App.vue",
  components: {ToastNotification, Form},
}
</script>

<style scoped>

.wrapper {
  max-width: 1280px;
  padding-top: 20px;
}
</style>
