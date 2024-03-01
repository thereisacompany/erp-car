<template>
    <div>
        <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>ScanerQR</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                <qrcode-stream v-show="camera !== 'off'" :camera="camera" @decode="onDecode" @init="onInit"></qrcode-stream>
                <div v-show="error !== ''">Error:
                    <p>{{ error }}</p>
                </div>
            </v-card-text>
            <!--v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" v-show="camera=='off'" @click="camera='auto'">Activar camara</v-btn>
        </v-card-actions-->
        </v-card>
    </div>
</template>
  
<script>
import { QrcodeStream } from "vue-qrcode-reader";
import { MapState } from "vuex";
export default {
    name: "QRScanner",
    components: {
        QrcodeStream
    },
    data() {
        return {
            camera: "auto",
            error: ""
        };
    },
    methods: {
        onDecode(scanResult) {
            this.$emit("on-decode", scanResult);
        },
        async onInit(promise) {
            try {
                await promise;
            } catch (error) {
                if (error.name === "NotAllowedError") {
                    this.error = "Debes autorizar el uso de la camara en esta web";
                } else if (error.name === "NotFoundError") {
                    this.error = "Camara no encontrada";
                } else if (error.name === "NotSupportedError") {
                    this.error = "Esta página requiere https";
                } else if (error.name === "NotReadableError") {
                    this.error = "Camara no disponible. Puede estar ocupada";
                } else if (error.name === "OverconstrainedError") {
                    this.error = "No hay camaras compatibles disponibles";
                } else if (error.name === "StreamApiNotSupportedError") {
                    this.error = "Su navegador no soporta la api de la camara";
                }
            }
        }
    },
    computed: {
        ...MapState
    }
};
</script>
  
<style></style>
  