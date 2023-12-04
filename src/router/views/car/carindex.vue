<template>
  <div>
    test123
  </div>
</template>>
<script>

export default {
  mounted() {
    this.$router.push(this.$route.query.redirectFrom || { name: "default", });
  },

}
</script>
