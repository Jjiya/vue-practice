import { createApp } from 'vue'
//import Vue from "vue";
import NumberBaseball from "./numberBaseball";

// https://vuejs.org/guide/quick-start.html#enabling-import-maps 참고해서 수정함 (강의 vue2, 현재 파일은 vue3라 문법에 차이가 남)
createApp(NumberBaseball).mount("#root");
// new Vue(NumberBaseball).$mount("#root");  // vue가 통제할 el(element) 적기