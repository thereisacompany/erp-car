<template>
  <div>
    <qrcode-stream ref="qrcodeStream" @decode="onDecode" v-if="isScanning" :located="true"></qrcode-stream>
    <button @click="toggleScanning" v-if="isScanning" style="color:black">關閉鏡頭</button>
  </div>
</template>

<script>
import QrcodeStream from 'vue-qrcode-reader/src/components/QrcodeStream.vue'; // 直接导入 QrcodeStream 组件

export default {
  components: {
    QrcodeStream,
  },
  data() {
    return {
      isScanning: false,
    };
  },
  methods: {
    toggleScanning() {
      this.isScanning = !this.isScanning;
      if (this.isScanning) {
        this.$refs.qrcodeStream.start();
      } else {
        this.$refs.qrcodeStream.stop();
      }
    },
    onDecode(result) {
      // 触发自定义事件，并将扫描结果传递给父组件
      this.$emit('scan-complete', result);
      this.toggleScanning(); // 扫描成功后关闭相机
    },
  },
};
</script>
