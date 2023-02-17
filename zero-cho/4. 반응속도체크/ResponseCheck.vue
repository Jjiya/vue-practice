<template>
  <div>
    <div id="screen" v-bind:class="state">{{ message }}</div>
    <div>
      <div>평균 시간: {{}}</div>
      <button @click="onReset">리셋</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: [],
      state: "waiting",
      message: "클릭해서 시작하세요.",
    };
  },
  methods: {
    onReset() {
    }
  }
}
</script>

<style scoped>
/*scoped: 현재 컴포넌트에서만 css가 적용되게끔 범위 적용하는 것*/
#screen {
  width: 300px;
  height: 200px;
  text-align: center;
  user-select: none;
}

#screen.waiting {
  background-color: aqua;
}

#screen.ready {
  background-color: red;
  color: #fff;
}

#screen.now {
  background-color: green;
}
</style>