import { createApp } from 'vue'

import App from './App.vue'
import router from "./router";
import BootstrapVue3 from 'bootstrap-vue-3';
import VueApexCharts from "vue3-apexcharts";
import vClickOutside from "click-outside-vue3";
import { registerScrollSpy } from 'vue3-scroll-spy';

import Maska from 'maska'
import { i18n } from "./i18n.js"
import PageLoading from "@/components/page-loading";


import 'sweetalert2/dist/sweetalert2.min.css';
import '@vueform/slider/themes/default.css';

import store from "./state/store";

import "../src/design/app.scss";
import './registerServiceWorker'

createApp(App)
  .component('PageLoading', PageLoading)
  .use(store)
  .use(router)
  .use(require('vue-chartist'))
  .use(BootstrapVue3)
  .use(VueApexCharts)
  .use(vClickOutside)
  .use(i18n)
  .use(registerScrollSpy)
  .use(Maska)
  .mount('#app')
