<template>
  <div>
    <div>Homeye</div>
    <div>{{ name }}</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["name"]),
  },
  created() {
    this.$store.dispatch("getName");
  },
  asyncData(store) {
    return store.dispatch("getName");
  },
};
</script>
