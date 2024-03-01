<template>
    <div>
        <button @click="startScanner">開啟相機</button>
        <div id="reader"></div>
    </div>
</template>
  
<script>
import Html5Qrcode from 'html5-qrcode';

export default {
    data() {
        return {
            html5QrCode: null,
            queryObj: {
                number: null
            }
        };
    },
    methods: {
        startScanner() {
            this.html5QrCode = new Html5Qrcode('reader');
            this.html5QrCode.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: 250
                },
                qrCodeMessage => {
                    this.queryObj.number = qrCodeMessage;
                    this.html5QrCode.stop().then(ignore => {
                        // QRCode scanned, stop the scanner
                        console.log('QRCode scanned:', qrCodeMessage, ignore);
                    }).catch(err => {
                        console.error('Error while stopping scanner', err);
                    });
                },
                errorMessage => {
                    console.error(errorMessage);
                }
            );
        }
    },
    unmounted() {
        if (this.html5QrCode) {
            this.html5QrCode.stop().then(ignore => {
                console.log('QRCode scanner stopped', ignore);
            }).catch(err => {
                console.error('Error while stopping scanner', err);
            });
        }
    }
};
</script>
  