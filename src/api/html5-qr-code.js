// Import the required library
const { Html5Qrcode } = require('html5-qrcode');

// Function to create and manage the HTML5 QR code scanner
const useHtml5QrCode = (domId) => {
    const html5QrCode = new Html5Qrcode(domId, { width: 300, height: 300 });

    // Function to start the camera and scan for QR codes
    const start = (qrCodeSuccessCallback) => {
        //console.log("start qrcode")
        // Camera configuration
        const brConfig = { fps: 10, qrbox: { width: 250, height: 250 } };

        // Start the camera and scan for QR codes

        html5QrCode.start({ facingMode: 'environment' },
            brConfig,
            qrCodeSuccessCallback,
            qrCodeErrorCallback
        );

    };

    // Function to stop the camera
    const handleStop = () => {
        try {
            // Stop the camera and clear the QR code scanner
            html5QrCode
                .stop()
                .then(() => {
                    html5QrCode.clear();
                })
                .catch((error) => {
                    console.log('danger', error.message);
                });
        } catch (error) {
            console.log('danger', error);
        }
    };

    // Error callback function
    const qrCodeErrorCallback = (error) => {
        // Temporary fix for a known issue in the library
        console.log('qrCodeErrorCallback error', error);
    };

    return {
        start,
        handleStop
    };
};

module.exports = { useHtml5QrCode };