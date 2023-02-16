<template>
  <div>
    <h1>{{ result }}</h1>
    <form @submit.prevent="onSubmitForm"> <!-- v-on >> @로 변환 가능, event.preventDefault를 여기서 .prevent를 추가함으로써 적용 가능 -->
      <input ref="answer" maxlength="4" v-model="value">
      <button>입력</button>
    </form>

    <div> 시도: {{ tries.length }}</div>
    <ul>
      <li v-for="trying in tries">
        <div>{{ trying.tryNumber }}</div>
        <div>- {{ trying.result }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tries: [],
      value: "",
      result: ""
    };
  },
  methods: {
    onSubmitForm() {
      this.tries.push({
        tryNumber: this.value,
        result: "홈런"
      });
      this.value = "";
      this.$refs.answer.focus();
    }
  }
}
</script>

<style></style>