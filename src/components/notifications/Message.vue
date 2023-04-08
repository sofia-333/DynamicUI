<template>
  <div v-if="success" class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 pr-40 pl-5 py-8 shadow-md text-l" role="alert">
    <p class="font-bold">Input analyzed</p>
    <p>Success</p>
  </div>
  <div v-else class="bg-orange-100 border-l-4 border-orange-500 rounded-b text-orange-700 pr-40 pl-5 py-8 shadow-md text-m" role="alert">
    <p class="font-bold">Input analyzed</p>
    <p>Fail: {{message}} </p>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    success: false,
    message: "",
  },
}
</script>

<style scoped>

</style>