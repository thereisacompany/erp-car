<template>
    <div>
        <div ref="qrCodeReader" style="width: 100%;"></div>
        <div v-if="scannedResult">Scanned Result: {{ scannedResult }}</div>
    </div>
</template>
  
<script>
import QrCode from 'html5-qrcode';

export default {
    data() {
        return {
            qrCodeReader: null,
            scannedResult: null
        };
    },
    mounted() {
        this.qrCodeReader = new QrCode(this.$refs.qrCodeReader);
        this.qrCodeReader.start(
            { facingMode: 'environment' },
            qrCodeMessage => {
                this.scannedResult = qrCodeMessage;
            },
            error => {
                console.error('Error scanning QR code:', error);
            }
        );
    },

};
</script>
  