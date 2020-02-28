<template>
  <div class="dashboard">
    <img alt="Vue logo" src="../assets/logo.png" />
    <StickyNote msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import StickyNote from "@/components/StickyNote.vue";

export default {
  name: "Dashboard",
  components: {
    StickyNote
  }
};
</script>
