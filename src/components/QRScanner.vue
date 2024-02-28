<template>
  <div>
    <video ref="video" autoplay></video>
    <canvas ref="canvas" style="display: none;"></canvas>
    <div>
      <p v-if="qrCodeResult">QR Code Result: {{ qrCodeResult }}</p>
      <p v-if="barcodeResult">Barcode Result: {{ barcodeResult }}</p>
    </div>
  </div>
</template>

<script>
import QrScanner from '@nimiq/qr-scanner';

export default {
  data() {
    return {
      qrCodeResult: '',
      barcodeResult: ''
    };
  },
  mounted() {
    this.initScanner();
  },
  methods: {
    async initScanner() {
      const video = this.$refs.video;
      const canvas = this.$refs.canvas;
      const scanner = new QrScanner(video, result => {
        if (result !== this.qrCodeResult) {
          this.qrCodeResult = result;
          this.barcodeResult = ''; // Reset barcode result if QR code found
        }
      });

      QrScanner.hasCamera().then(hasCamera => {
        if (!hasCamera) {
          alert('No camera found');
          return;
        }
        QrScanner.listCameras().then(cameras => {
          if (cameras.length > 0) {
            scanner.start(cameras[0]);
          } else {
            alert('No cameras found');
          }
        });
      });

      scanner.start();
    },
  },
};
</script>

<style scoped>
/* Add some styles if needed */
</style>
