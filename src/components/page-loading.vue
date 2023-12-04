<template>
  <transition name="fade" mode="out-in">
    <div class="preload preload-container" v-if="IsPreload">
      <div class="preload-logo">
        <div class="spinner"></div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      IsPreload: true,
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.IsPreload = false;
      }, 150);
    })
  }
}
</script>


