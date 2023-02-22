<template>
  <td @click="store.onClickTd(cellData, rowIndex, cellIndex)">{{ cellData }}</td>
</template>

<script>
import {store} from "./EventBus";

export default {
  name: "TdComponent",
  props: {
    cellData: String,
    cellIndex: Number,
    rowIndex: Number
  },
  data() {
    return {store}
  },
  methods: {}
}
</script>

<style scoped>

</style>